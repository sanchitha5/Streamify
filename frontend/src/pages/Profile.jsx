const ProfilePage = () => {
  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="card bg-base-200 p-6">
        <div className="text-center">
          <img
            src="https://ui-avatars.com/api/?name=User"
            className="w-28 h-28 rounded-full mx-auto"
          />

          <h2 className="text-2xl font-bold mt-4">
            John Doe
          </h2>

          <p className="opacity-70">
            john@example.com
          </p>

          <button className="btn btn-primary mt-4">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;