class ImagePreview {
  constructor(inputId, previewContainerId) {
    this.inputElement = document.getElementById(inputId);
    this.previewContainer = document.getElementById(previewContainerId);
    this.previewImage = null;
    this.imageValue = null;
    this.init();
  }
  init() {
    if (!this.inputElement || !this.previewContainer) {
      return;
    }
    this.inputElement.addEventListener('change', (e) => this.handleFileSelect(e));
  }
  async handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
      this.clear();
      return;
    }
    const validation = ValidationService.validateImage(file);
    if (!validation.valid) {
      this.showError(validation.error);
      this.clear();
      return;
    }
    try {
      const base64 = await this.fileToBase64(file);
      const compressed = await this.compressImage(base64);
      this.imageValue = compressed;
      this.showPreview(compressed);
    } catch (error) {
      this.showError('Erro ao processar imagem. Tente outro arquivo.');
    }
  }
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  compressImage(base64) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > CONFIG.MAX_IMAGE_WIDTH) {
          height = (height * CONFIG.MAX_IMAGE_WIDTH) / width;
          width = CONFIG.MAX_IMAGE_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', CONFIG.IMAGE_COMPRESSION_QUALITY));
      };
      img.src = base64;
    });
  }
  showPreview(base64) {
    this.previewContainer.innerHTML = `
      <img src="${base64}" alt="Preview da imagem" class="image-preview">
    `;
    this.previewContainer.classList.add('show');
  }
  clear() {
    this.previewContainer.innerHTML = '';
    this.previewContainer.classList.remove('show');
    this.imageValue = null;
    if (this.inputElement) {
      this.inputElement.value = '';
    }
  }
  showError(message) {
    showErrorToast(message);
  }
  getValue() {
    return this.imageValue;
  }
}
