import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'ADMIN_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'CLIENT_URL'
];

export const validateEnvironment = () => {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('\n❌ MISSING REQUIRED ENVIRONMENT VARIABLES:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  // Additional validation for critical values
  if (process.env.JWT_SECRET.length < 20) {
    console.error('❌ JWT_SECRET must be at least 20 characters long');
    process.exit(1);
  }

  if (process.env.ADMIN_SECRET.length < 10) {
    console.error('❌ ADMIN_SECRET must be at least 10 characters long');
    process.exit(1);
  }

  if (isNaN(parseInt(process.env.PORT))) {
    console.error('❌ PORT must be a valid number');
    process.exit(1);
  }

  console.log('✓ All environment variables validated successfully');
};
