#!/bin/bash
# Dead Code Cleanup Script
# These files have been consolidated and should be removed

echo "Removing dead code files..."

# Remove duplicate Admin model (consolidated to User.js)
rm -f ./models/Admin.js
echo "✓ Removed models/Admin.js (consolidated to User.js)"

# Remove duplicate adminController (consolidated to authController.js)  
rm -f ./controllers/adminController.js
echo "✓ Removed controllers/adminController.js (consolidated to authController.js)"

# Remove duplicate adminRoute (consolidated to authRoutes.js)
rm -f ./routes/adminRoute.js
echo "✓ Removed routes/adminRoute.js (consolidated to authRoutes.js)"

echo ""
echo "✓ Dead code cleanup complete!"
echo ""
echo "Summary of consolidations:"
echo "  - Admin model → User model"
echo "  - adminController → authController"
echo "  - adminRoute → authRoutes"
