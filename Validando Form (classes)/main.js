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
		const fieldValid = this.fieldIsValid();
		const validPassword = this.validIsPassword();

		if(fieldValid && validPassword) {
			alert('for enviado');
			this.form.submit();
		}
	}

	fieldIsValid() {
		let valid = true;

		for(let errorText of this.form.querySelectorAll('.error-text')) {
			errorText.remove();
		}

		for(let field of this.form.querySelectorAll('.valid')) {
			const label = field.previousElementSibling.innerText;

			if(!field.value) {
				this.createError(field, `Campo "${label}" não pode estar vazio.`);
				valid = false;
			}

			if(field.classList.contains('cpf')) {
				if(!this.validCPF(field)) valid = false;
			}

			if(field.classList.contains('usuario')) {
				if(!this.validUser(field)) valid = false;
			}
		}

		return valid;
	}

	createError(field, msg) {
		const div = document.createElement('div');
		div.innerHTML = msg;
		div.classList.add('error-text');
		field.insertAdjacentElement('afterend', div);
	}

	validCPF(field) {
		const cpf = new ValidaCPF(field.value);

		if(!cpf.valida()) {
			this.createError(field, 'CPF inválido');
			return false;
		}

		return true;
	}

	validUser(field) {
		const user = field.value;
		let valid = true;

		if(user.length < 3 || user.length > 12) {
			this.createError(field, 'Usuário deverá ter entre 3 e 12 caracteres.');
			valid = false;
		}

		if(!user.match(/^[a-zA-Z0-9]+$/g)) {
			this.createError(field, 'Nome de usuário precisa conter apenas letras ou números');
			valid = false;
		}

		return valid;
	}

	validIsPassword() {
		let valid = true;
		const password = this.form.querySelector('.senha');
		const repeatPassword = this.form.querySelector('.repetir-senha');

		if(password.value.length < 6 || password.value.length > 12) {
			this.createError(password, 'Senha precisa conter de 6 à 12 caracteres.');
			valid = false;
		}

		if(password.value !==repeatPassword.value) {
			this.createError(password, 'Campos senha e repetir senha precisam ser iguais');
			this.createError(repeatPassword, 'Campos senha e repetir senha precisam ser iguais');
			valid = false;
		}

		return valid;
	}
}

const form = new ValidForm();

//421.703.718-01