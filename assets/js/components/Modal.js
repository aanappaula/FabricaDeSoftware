class Modal {
  constructor(options) {
    this.title = options.title || '';
    this.body = options.body || '';
    this.buttons = options.buttons || [];
    this.modalId = 'modal-' + Date.now();
  }
  show() {
    const modalHTML = this.render();
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalElement = document.getElementById(this.modalId);
    const bsModal = new bootstrap.Modal(modalElement);
    this.buttons.forEach((button, index) => {
      const btnElement = modalElement.querySelector(`[data-btn-index="${index}"]`);
      if (btnElement && button.onClick) {
        btnElement.addEventListener('click', () => {
          button.onClick();
          bsModal.hide();
        });
      }
    });
    modalElement.addEventListener('hidden.bs.modal', () => {
      modalElement.remove();
    });
    bsModal.show();
  }
  render() {
    const buttonsHTML = this.buttons.map((button, index) => `
      <button type="button" class="btn ${button.class || 'btn-primary'}" data-btn-index="${index}">
        ${button.text}
      </button>
    `).join('');
    return `
      <div class="modal fade" id="${this.modalId}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this.title}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              ${this.body}
            </div>
            <div class="modal-footer">
              ${buttonsHTML}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
