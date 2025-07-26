const express = require('express');
const { getOnboardingContent } = require('../controllers/onboardingController');

const router = express.Router();

// Public route - no authentication required
router.get('/onboarding', getOnboardingContent);

module.exports = router;