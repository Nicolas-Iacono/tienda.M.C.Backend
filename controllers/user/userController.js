const userService = require('../../services/userService');
const bcrypt = require('bcrypt');
const  Address = require('../../models/userInfo/Address');
const  Phone  = require('../../models/userInfo/Phone');
const User = require('../../models/User')
const  sequelize  = require('../../config/database'); 
const jwt = require('jsonwebtoken');
const Authorities = require('../../models/userInfo/Authorities');
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
};



exports.createUserWithRelations = async (req, res) => {
  const { first_name, last_name, email, password, address, phone } = req.body;

  if (!address || !phone) {
    return res.status(400).json({ error: 'Address and phone are required' });
  }

  // Validar las propiedades de address y phone
  const requiredAddressFields = ['zip_code', 'street_name', 'street_number', 'city_name'];
  const requiredPhoneFields = ['area_code', 'number'];

  for (const field of requiredAddressFields) {
    if (!address[field]) {
      return res.status(400).json({ error: `Address field '${field}' is required` });
    }
  }

  for (const field of requiredPhoneFields) {
    if (!phone[field]) {
      return res.status(400).json({ error: `Phone field '${field}' is required` });
    }
  }

  const transaction = await sequelize.transaction(); // Iniciar transacción

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await User.create(
      { first_name, last_name, email, password: hashedPassword },
      { transaction }
    );

    // Crear la dirección
    const newAddress = await Address.create(
      {
        zip_code: address.zip_code,
        street_name: address.street_name,
        street_number: address.street_number,
        city_name: address.city_name,
        floor: address.floor,
        apartment: address.apartment,
        userId: newUser.id,
      },
      { transaction }
    );

    // Crear el teléfono
    const newPhone = await Phone.create(
      {
        area_code: phone.area_code,
        number: phone.number,
        userId: newUser.id,
      },
      { transaction }
    );

    const [authority,created] = await Authorities.findOrCreate({where: {role:'user'},  defaults: { role: 'user' } });
    if(!authority){
      return res.status(500).json({message:'El rol no esta definido'})
    }
    if (created) {
      console.log(`El rol '${authority.role}' fue creado.`);
    } else {
      console.log(`El rol '${authority.role}' ya existía.`);
    }
    await newUser.addAuthority(authority,  { transaction });

    // Confirmar la transacción
    await transaction.commit();

    // Respuesta exitosa
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      address: newAddress,
      phone: newPhone,
      role: authority.role,
    });
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
};


exports.createAdminWithRelations = async (req, res) => {
  const { first_name, last_name, email, password, address, phone } = req.body;

  if (!address || !phone) {
    return res.status(400).json({ error: 'Address and phone are required' });
  }

  // Validar las propiedades de address y phone
  const requiredAddressFields = ['zip_code', 'street_name', 'street_number', 'city_name'];
  const requiredPhoneFields = ['area_code', 'number'];

  for (const field of requiredAddressFields) {
    if (!address[field]) {
      return res.status(400).json({ error: `Address field '${field}' is required` });
    }
  }

  for (const field of requiredPhoneFields) {
    if (!phone[field]) {
      return res.status(400).json({ error: `Phone field '${field}' is required` });
    }
  }

  const transaction = await sequelize.transaction(); // Iniciar transacción

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await User.create(
      { first_name, last_name, email, password: hashedPassword },
      { transaction }
    );

    // Crear la dirección
    const newAddress = await Address.create(
      {
        zip_code: address.zip_code,
        street_name: address.street_name,
        street_number: address.street_number,
        city_name: address.city_name,
        floor: address.floor,
        apartment: address.apartment,
        userId: newUser.id,
      },
      { transaction }
    );

    // Crear el teléfono
    const newPhone = await Phone.create(
      {
        area_code: phone.area_code,
        number: phone.number,
        userId: newUser.id,
      },
      { transaction }
    );

    const [authority,created] = await Authorities.findOrCreate({where: {role:'admin'}, defaults: { role: 'admin' }});
    if(!authority){
      return res.status(500).json({message:'El rol no esta definido'})
    }

    if (created) {
      console.log(`El rol '${authority.role}' fue creado.`);
    } else {
      console.log(`El rol '${authority.role}' ya existía.`);
    }
   
    await newUser.addAuthority(authority,  { transaction });

    // Confirmar la transacción
    await transaction.commit();

    // Respuesta exitosa
    res.status(201).json({
      message: 'user-admin creado existosamente',
      user: newUser,
      address: newAddress,
      phone: newPhone,
      role: authority.role,
    });
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error creating admin', details: error.message });
  }
};
  


exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
      console.log('Datos recibidos en el login:', req.body);
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Credenciales inválidas' });

        const formattedRoles = user.authorities
            ? user.authorities.map(auth => `ROLE_${auth.role.toUpperCase()}`)
            : [];
    console.log('Roles del usuario:', formattedRoles);
        
        const payload = { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, authorities: formattedRoles};

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, authorities: formattedRoles }, token  });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
        }
};

