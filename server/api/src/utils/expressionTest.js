export const cpfTest = (cpf) => /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(cpf);
export const emailTest = (email) => /^[a-z 0-9 A-Z]+@[a-z]+\.[a-z]{2,3}/.test(email);
export const telefoneTest = (telefone) => /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}/.test(telefone);
