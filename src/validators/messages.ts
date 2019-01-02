export const ValidationMessages = {
    'email': [
        { type: 'required', message: 'Se requiere un email.' },
        { type: 'pattern', message: 'Email invalido.' },            
    ],
    'firstName': [
        { type: 'required', message: 'Se requiere un nombre.' },
        { type: 'minlength', message: 'Se requiere minimo 2 caracteres.' },
        { type: 'pattern', message: 'Solo caracteres del abecedario.' },  
    ],
    'lastName': [
        { type: 'required', message: 'Se requiere un apellido.' },
        { type: 'minlength', message: ' Se requiere minimo 2 caracteres.' },
        { type: 'pattern', message: 'Solo caracteres del abecedario.' },  
    ],
    'password': [
        { type: 'required', message: 'Se requiere una contraseña.' },
        { type: 'minlength', message: ' Se requiere minimo 6 caracteres.' }
    ],
    'confirmPassword':[
        { type: 'required', message: 'Confirma tu contraseña.' },
        { type: 'areEqual', message: 'Las contraseñas no coinciden.' }
    ],
    'phone':[
        { type: 'required', message: 'Se requiere un numero celular.' },
        { type: 'minlength', message: ' Se requiere un numero minimo de 10 digitos.' }
    ],
    'total':[
        { type: 'required', message: 'Se requiere una monto.' }
        
    ]
}
