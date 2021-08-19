const dbBranchName =
  process.env.NODE_ENV === 'production' ? 'main' : 'development';

export default dbBranchName;
