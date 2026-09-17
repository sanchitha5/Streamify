// ContactsPage.tsx
const ContactsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>

      <div className="space-y-4">
        {["John", "Emma", "Alex"].map((user) => (
          <div
            key={user}
            className="flex justify-between items-center p-4 bg-base-200 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${user}`}
                className="w-12 h-12 rounded-full"
              />
              <span>{user}</span>
            </div>

            <button className="btn btn-primary btn-sm">
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;