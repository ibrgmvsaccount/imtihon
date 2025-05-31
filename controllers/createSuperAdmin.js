const Staff = require('./models/Staff');
const bcrypt = require('bcrypt');

async function createSuperAdmin() {
  const existing = await Staff.findOne({ username: 'superadmin' });
  if (existing) {
    console.log('✅ SuperAdmin allaqachon mavjud');
    return;
  }

  const hashedPassword = await bcrypt.hash('superpassword', 10);

  const superAdmin = new Staff({
    username: 'superadmin',
    password: hashedPassword,
    birthdate: new Date('1990-01-01'),
    gender: 'male',
    role: 'SuperAdmin',
    branch: 'main-branch-id'
  });

  await superAdmin.save();
  console.log('SuperAdmin yaratildi: username = superadmin, password = superpassword');
}

module.exports = createSuperAdmin;