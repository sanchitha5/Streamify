const SearchPage = () => {
  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search users..."
        className="input input-bordered w-full mb-6"
      />

      <div className="space-y-4">
        {["Alex", "Emma", "Sarah"].map((user) => (
          <div
            key={user}
            className="flex justify-between p-4 bg-base-200 rounded-xl"
          >
            <span>{user}</span>

            <button className="btn btn-primary btn-sm">
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;