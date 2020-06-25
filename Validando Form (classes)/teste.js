class ValidForm {
	constructor() {
		this.form = document.querySelector('.form');
		this.events();
	}

	events() {
		this.form.addEventListener('submit', e => {
			this.handleSubmit(e);
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const fieldValid = this. fieldIsValid();
		const passwordValid = this.passwordIsValid();

		if(fieldValid && passwordValid) {
			alert('form enviado');
			this.form.submit();
		}
	}

	passwordIsValid() {
		let valid = true;
		const password = this.form.querySelector('.senha');
		const repeatPassword = this.form.querySelector('.repetir-senha');

		if(password.value !== repeatPassword.value) {
			valid = false;
			this.createError(password, 'Campos senha e repetr senha precisam ser iguais');
			this.createError(repeatPassword, 'Campos senha e repetr senha precisam ser iguais');
		}

		if(password.value.length < 6 || password.value.length > 12) {
			valid = false;
			this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres.');
		}

		return valid;
	}

	fieldIsValid() {
		let valid = true;

		for(let errorText of this.form.querySelectorAll('.error-text')) {
			errorText.remove();
		}

		for(let field of this.form.querySelectorAll('.valid')) {
			const label = field.previousElementSibling.innerHTML;

			if(!field.value) {
				this.createError(field, `Campo "${label}" não pode estar em branco`);
				valid = false;
			}

			if(field.classList.contains('cpf')) {
				if(!this.validaCPF(field)) valid = false;
			}

			if(field.classList.contains('usuario')) {
				if(!this.validUser(field)) valid = false;
			}
		}

		return valid;
	}

	validaCPF(field) {
		const cpf = new ValidaCPF(field.value);

		if(!cpf.valida()) {
			this.createError(field, 'CPF inválido');
			return false;
		}

		return true;
	}

	validUser(field) {
		const usuer = field.value;
		let valid = true

		if(usuer.length < 3 || usuer.length > 12) {
			this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
			valid = false;
		}

		if(!usuer.match(/^[a-zA-Z0-9]+$/g)) {
			this.createError(field, 'Nome de usuário precisa conter apenas letras ou números.');
			valid = false;
		}
		return valid;
	}

	createError(field, msg) {
		const div = document.createElement('div');
		div.innerHTML = msg;
		div.classList.add('error-text');
		field.insertAdjacentElement('afterend', div);
	}
}

const form = new ValidForm();