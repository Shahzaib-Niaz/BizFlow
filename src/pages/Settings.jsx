import { useState } from "react";
import { Bell, Lock, User } from "lucide-react";

function Settings() {
  const [profile, setProfile] = useState({
    name: "Shahzaib",
    email: "shahzaib@example.com",
    role: "Administrator",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderNotifications: true,
    taskNotifications: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;

    setNotifications((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    alert("Profile updated successfully.");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirmation password do not match.");
      return;
    }

    alert("Password updated successfully.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>

        <p className="mt-2 text-slate-400">
          Manage your profile, notifications, and account settings.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <section className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
              <User size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Profile Information
              </h2>

              <p className="text-sm text-slate-500">
                Update your personal information.
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Role
              </label>

              <input
                id="role"
                type="text"
                value={profile.role}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Save Changes
            </button>
          </form>
        </section>

        {/* Notification Settings */}
        <section className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
              <Bell size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Choose which notifications you receive.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Email Notifications
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Receive important updates through email.
                </p>
              </div>

              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationChange}
                className="h-4 w-4 accent-blue-600"
              />
            </label>

            <div className="border-t border-slate-800" />

            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Order Notifications
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Get notified when an order changes status.
                </p>
              </div>

              <input
                type="checkbox"
                name="orderNotifications"
                checked={notifications.orderNotifications}
                onChange={handleNotificationChange}
                className="h-4 w-4 accent-blue-600"
              />
            </label>

            <div className="border-t border-slate-800" />

            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Task Notifications
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Receive reminders about upcoming tasks.
                </p>
              </div>

              <input
                type="checkbox"
                name="taskNotifications"
                checked={notifications.taskNotifications}
                onChange={handleNotificationChange}
                className="h-4 w-4 accent-blue-600"
              />
            </label>
          </div>
        </section>

        {/* Password Settings */}
        <section className="rounded-xl border border-slate-800 bg-slate-950 p-6 lg:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
              <Lock size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Change Password
              </h2>

              <p className="text-sm text-slate-500">
                Update your account password.
              </p>
            </div>
          </div>

          <form
            onSubmit={handlePasswordSubmit}
            className="grid gap-5 md:grid-cols-3"
          >
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Current Password
              </label>

              <input
                id="currentPassword"
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                New Password
              </label>

              <input
                id="newPassword"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                Update Password
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Settings;