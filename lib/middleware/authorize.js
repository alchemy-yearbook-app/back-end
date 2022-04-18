module.exports = async (req, res, next) => {
  // Check req.user to ensure the user's github_team_id matches the cohort that they're in
  try {
    if (!req.user || req.user.email !== 'admin') {
      throw new Error('You do not have access to view this page');
    }
    next();
  } catch (error) {
    (error.status = 403), next(error);
  }
};
