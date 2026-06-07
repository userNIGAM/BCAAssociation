import { body } from 'express-validator';

const VALID_DESIGNATIONS = [
  'President', 'Vice President', 'Secretary', 'Vice Secretary',
  'Treasurer', 'Tech Lead', 'Tech Member', 'Graphics Lead',
  'Graphics Member', 'Executive Member'
];

const isValidUrl = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateTeamMember = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),

  body('designation')
    .notEmpty()
    .withMessage('Designation is required')
    .isIn(VALID_DESIGNATIONS)
    .withMessage(`Designation must be one of: ${VALID_DESIGNATIONS.join(', ')}`),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),

  body('address')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Address cannot exceed 300 characters'),

  body('contact')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Contact must be a valid phone number'),

  body('order')
    .optional()
    .isInt({ min: 0, max: 999 })
    .withMessage('Order must be a number between 0 and 999'),

  body('social_links').custom((value) => {
    if (!value) return true; // Optional
    
    let links = value;
    
    // Parse if string
    if (typeof value === 'string') {
      try {
        links = JSON.parse(value);
      } catch {
        throw new Error('social_links must be valid JSON');
      }
    }

    // Validate that it's an object
    if (typeof links !== 'object' || Array.isArray(links)) {
      throw new Error('social_links must be a JSON object');
    }

    // Validate each URL
    const validPlatforms = ['facebook', 'instagram', 'linkedin', 'twitter', 'github'];
    for (const [platform, url] of Object.entries(links)) {
      if (!validPlatforms.includes(platform)) {
        throw new Error(`Invalid social platform: ${platform}`);
      }
      if (url && !isValidUrl(url)) {
        throw new Error(`Invalid URL for ${platform}: ${url}`);
      }
    }

    return true;
  }),
];
