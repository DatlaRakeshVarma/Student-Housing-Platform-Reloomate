// @desc    Get onboarding content
// @route   GET /api/onboarding
// @access  Public
const getOnboardingContent = async (req, res) => {
  try {
    const onboardingSteps = [
      {
        id: 1,
        title: "Welcome to RelooMate",
        description: "Find your perfect student housing match with our AI-powered platform. Connect with compatible roommates and discover amazing properties.",
        image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: 2,
        title: "Smart Matching System",
        description: "Our advanced algorithm considers your lifestyle, study habits, and preferences to match you with the most compatible roommates and housing options.",
        image: "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: 3,
        title: "Safe & Secure Platform",
        description: "All users are verified students. Chat safely, schedule visits, and sign leases with confidence through our secure platform.",
        image: "https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Onboarding content retrieved successfully',
      data: {
        steps: onboardingSteps,
        totalSteps: onboardingSteps.length
      }
    });

  } catch (error) {
    console.error('Get onboarding content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving onboarding content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getOnboardingContent
};