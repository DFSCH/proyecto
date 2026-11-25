export class ApiError extends Error {
  constructor(status, message, errors = {}) { super(message); this.status = status; this.errors = errors; }
}
export const invalid = errors => { if (Object.keys(errors).length) throw new ApiError(400, 'Revisa los campos del formulario.', errors); };
export function idParam(value) { if (!/^[1-9]\d*$/.test(String(value)) || !Number.isSafeInteger(Number(value))) throw new ApiError(400, 'Identificador inválido.', {id:'Debe ser un entero positivo.'}); return Number(value); }
