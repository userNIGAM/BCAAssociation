// scripts/migrateSocialLinks.js
import mongoose from 'mongoose';
import Team from '../models/Team.js';
import dotenv from 'dotenv';
dotenv.config();

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const members = await Team.find({});
    let updatedCount = 0;

    for (const member of members) {
      let needsUpdate = false;
      const newSocialLinks = {
        facebook: member.social_links?.facebook || '',
        instagram: member.social_links?.instagram || '',
        linkedin: member.social_links?.linkedin || '',
        twitter: member.social_links?.twitter || '',
        github: member.social_links?.github || '',
      };

      // Check if any change is needed
      if (!member.social_links ||
          member.social_links.facebook !== newSocialLinks.facebook ||
          member.social_links.instagram !== newSocialLinks.instagram ||
          member.social_links.linkedin !== newSocialLinks.linkedin ||
          member.social_links.twitter !== newSocialLinks.twitter ||
          member.social_links.github !== newSocialLinks.github) {
        
        await Team.updateOne(
          { _id: member._id },
          { $set: { social_links: newSocialLinks } }
        );
        updatedCount++;
      }
    }

    console.log(`Migration completed. Updated ${updatedCount} members.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

migrate();