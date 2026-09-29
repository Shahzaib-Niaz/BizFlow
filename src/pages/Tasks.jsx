import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { tasks as initialTasks } from "../data/tasks";
import { customers } from "../data/Customers";
import Modal from "../ui/Modal";

const statusStyles = {
  Pending: "bg-yellow-500/10 text-yellow-400",
  "In Progress": "bg-blue-500/10 text-blue-400",
  Completed: "bg-emerald-500/10 text-emerald-400",
};

const priorityStyles = {
  Low: "bg-slate-800 text-slate-400",
  Medium: "bg-yellow-500/10 text-yellow-400",
  High: "bg-red-500/10 text-red-400",
};

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    customerId: "",
    assignee: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  const filteredTasks = tasks.filter((task) => {
    const customer = customers.find(
      (customer) => customer.id === task.customerId
    );

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(search) ||
      task.assignee.toLowerCase().includes(search) ||
      customer?.name.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);

    setFormData({
      title: "",
      customerId: "",
      assignee: "",
      priority: "Medium",
      dueDate: "",
      status: "Pending",
    });

    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);

    setFormData({
      title: task.title,
      customerId: task.customerId,
      assignee: task.assignee,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status,
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);

    setFormData({
      title: "",
      customerId: "",
      assignee: "",
      priority: "Medium",
      dueDate: "",
      status: "Pending",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.customerId ||
      !formData.assignee.trim() ||
      !formData.dueDate
    ) {
      return;
    }

    const taskData = {
      title: formData.title.trim(),
      customerId: Number(formData.customerId),
      assignee: formData.assignee.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate,
      status: formData.status,
    };

    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...taskData,
              }
            : task
        )
      );

      handleCloseModal();
      return;
    }

    const newTask = {
      id: Date.now(),
      ...taskData,
    };

    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);

    handleCloseModal();
  };

  const handleDeleteTask = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find(
      (customer) => customer.id === customerId
    );

    return customer ? customer.name : "Unknown Customer";
  };

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Tasks
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your team's work and deadlines.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Filters */}

      <div className="mt-8 flex flex-col gap-4 xl:flex-row">
        <div className="relative max-w-md flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
          className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Table */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b border-slate-800 bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Task
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Assignee
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Priority
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Due Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="transition hover:bg-slate-900/70"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">
                        {task.title}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-300">
                        {getCustomerName(task.customerId)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400">
                        {task.assignee}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          priorityStyles[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400">
                        {task.dueDate}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          statusStyles[task.status]
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEditModal(task)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400"
                          title="Edit task"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteTask(task.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                          title="Delete task"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-slate-400">
                      No tasks found
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Add Task"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Task Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="customerId"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Customer
            </label>

            <select
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="">Select customer</option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="assignee"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Assignee
            </label>

            <input
              id="assignee"
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
              placeholder="Enter assignee"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Due Date
            </label>

            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              {editingTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Tasks;