export const cpfTest = (cpf) => (cpf.length <= 14 ? /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(cpf) : false);
export const emailTest = (email) => (email.length <= 200 ? /^[a-z 0-9 A-Z]+@[a-z]+\.[a-z]{2,3}/.test(email) : false);
export const telefoneTest = (telefone) => (telefone.length <= 14 ? /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}/.test(telefone) : false);
export const nameTest = (nome) => nome.trim() && nome.length < 50;
