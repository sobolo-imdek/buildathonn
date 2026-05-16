import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlusCircle, ClipboardList, CheckCircle2, CircleDot, Clock, User, Briefcase } from 'lucide-react';

type ProjectStatus = 'Not started' | 'In progress' | 'Done';

interface Project {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  createdAt: number;
}

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    status: 'Not started' as ProjectStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.owner.trim()) return;

    const newProject: Project = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      owner: formData.owner,
      status: formData.status,
      createdAt: Date.now(),
    };

    setProjects([newProject, ...projects]);
    setFormData({ name: '', owner: '', status: 'Not started' });
  };

  const statusColors = {
    'Not started': 'bg-slate-100 text-slate-600 border-slate-200',
    'In progress': 'bg-blue-50 text-blue-600 border-blue-200',
    'Done': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };

  const statusIcons = {
    'Not started': <CircleDot className="w-3.5 h-3.5" />,
    'In progress': <Clock className="w-3.5 h-3.5" />,
    'Done': <CheckCircle2 className="w-3.5 h-3.5" />,
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-neutral-900 p-2 rounded-xl text-white">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Team Project Tracker</h1>
          </div>
          <p className="text-neutral-500 font-medium italic text-sm">Efficiently manage and monitor team progress.</p>
        </header>

        {/* Form Section */}
        <section className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-neutral-400" />
            Add New Project
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <label htmlFor="name" className="flex items-center gap-1.5">
                 <Briefcase className="w-3 h-3" /> Project Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Q3 Website Redesign"
                className="w-full bg-white text-gray-500 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all placeholder:text-neutral-300"
                required
              />
            </div>

            <div className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <label htmlFor="owner" className="flex items-center gap-1.5">
                <User className="w-3 h-3" /> Owner
              </label>
              <input
                id="owner"
                type="text"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="Ex: Sarah Jenkins"
                className="w-full bg-white text-gray-500 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all placeholder:text-neutral-300"
                required
              />
            </div>

            <div className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <label htmlFor="status" className="flex items-center gap-1.5">
                <CircleDot className="w-3 h-3" /> Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                className="w-full bg-white text-gray-500 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all appearance-none cursor-pointer"
              >
                <option value="Not started">Not started</option>
                <option value="In progress">In progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="md:col-span-3 pt-2">
              <button
                type="submit"
                className="w-full bg-neutral-900 text-white font-medium py-3 rounded-xl hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10 active:scale-[0.98] transform transition-transform"
              >
                Add Project
              </button>
            </div>
          </form>
        </section>

        {/* Table Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase font-bold tracking-widest text-neutral-400">Project list</h2>
            <span className="text-xs font-mono text-neutral-400">{projects.length} Total</span>
          </div>

          <div className="overflow-hidden border border-neutral-200 rounded-3xl bg-white shadow-sm ring-1 ring-neutral-900/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-bottom border-neutral-100 bg-neutral-50/50">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Project</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Owner</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <AnimatePresence initial={false}>
                  {projects.length === 0 ? (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center italic text-neutral-400"
                    >
                      <td colSpan={3} className="px-6 py-12">
                        No projects added yet. Start by filling the form above.
                      </td>
                    </motion.tr>
                  ) : (
                    projects.map((project) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-neutral-50/50 transition-colors group"
                      >
                        <td className="px-6 py-5">
                          <span className="font-medium text-neutral-800">{project.name}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-400 uppercase">
                                {project.owner.charAt(0)}
                             </div>
                             <span className="text-neutral-600">{project.owner}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                            {statusIcons[project.status]}
                            {project.status}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

