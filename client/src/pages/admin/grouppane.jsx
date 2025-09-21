import {
  UserPlus,
  Search,
  X,
  Trash2,
  Edit,
  Users,
  Filter,
  MoreVertical,
  Mail,
  Sparkles,
  GraduationCap,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import AdminNav from "./shared/nav";
import { adminServices } from "@/services/adminServices";
import { useToast } from "@/components/ui/toast";

const GroupPane = () => {
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]); // all students in system
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  // Search state for group modals
  const [modalSearchTerm, setModalSearchTerm] = useState("");

  const { showToast } = useToast();

  useEffect(() => {
    fetchGroups();
    fetchStudents();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminServices.getMyGroups();
      setGroups(Array.isArray(res) ? res : []);
    } catch {
      setError("Failed to load groups.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await adminServices.getStudents();
      setStudents(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  // Get students who are not already in any group
  const getAvailableStudents = () => {
    const studentsInGroups = new Set();

    // Collect all student IDs that are already in groups
    groups.forEach((group) => {
      if (group.students && Array.isArray(group.students)) {
        group.students.forEach((student) => {
          studentsInGroups.add(student.id);
        });
      }
    });

    // Filter out students who are already in groups
    return students.filter((student) => !studentsInGroups.has(student.id));
  };

  // Get students available for editing a specific group (includes current group members)
  const getAvailableStudentsForEdit = (currentGroupId) => {
    const studentsInOtherGroups = new Set();

    // Collect all student IDs that are in OTHER groups (not the current one being edited)
    groups.forEach((group) => {
      const groupId = group._id || group.id;
      if (
        groupId !== currentGroupId &&
        group.students &&
        Array.isArray(group.students)
      ) {
        group.students.forEach((student) => {
          studentsInOtherGroups.add(student.id);
        });
      }
    });

    // Return students who are either:
    // 1. Not in any group (available to add)
    // 2. Currently in the group being edited (can be removed)
    return students.filter((student) => !studentsInOtherGroups.has(student.id));
  };

  // Filter students based on modal search term
  const getFilteredStudentsForModal = (availableStudents) => {
    if (!modalSearchTerm.trim()) {
      return availableStudents;
    }

    const searchTerm = modalSearchTerm.toLowerCase();
    return availableStudents.filter((student) => {
      const name = (student?.name ?? "").toLowerCase();
      const email = (student?.email ?? "").toLowerCase();
      return name.includes(searchTerm) || email.includes(searchTerm);
    });
  };

  const handleOpenAddGroup = async () => {
    // await fetchStudents();
    setModalSearchTerm(""); // Reset search when opening
    setShowAddModal(true);
  };

  const handleCreateGroup = async () => {
    try {
      await adminServices.createGroup(newGroupName, selectedStudents);
      setShowAddModal(false);
      setNewGroupName("");
      setSelectedStudents([]);
      fetchGroups();
      showToast({
        variant: "success",
        title: "Group Created Successfully! 🎉",
        description: `"${newGroupName}" has been created with ${selectedStudents.length} students.`,
        duration: 4000,
      });
    } catch (e) {
      console.error("Failed to create group:", e);
      showToast({
        variant: "error",
        title: "Failed to Create Group",
        description: "There was an error creating the group. Please try again.",
        duration: 4000,
      });
    }
  };

  const toggleStudentSelection = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleDeleteGroup = (group) => {
    setGroupToDelete(group);
    setShowDeleteModal(true);
  };

  const confirmDeleteGroup = async () => {
    if (!groupToDelete) return;

    try {
      // Use the MongoDB _id field (which is the primary identifier)
      const groupId = groupToDelete._id;

      if (!groupId) {
        throw new Error("No valid group ID found in the group object");
      }

      await adminServices.deleteGroup(groupId);
      fetchGroups();
      setShowDeleteModal(false);
      setGroupToDelete(null);
      showToast({
        variant: "success",
        title: "Group Deleted Successfully! 🗑️",
        description: `"${groupToDelete.name}" has been permanently deleted.`,
        duration: 4000,
      });
    } catch (e) {
      console.error("Failed to delete group:", e);
      showToast({
        variant: "error",
        title: "Failed to Delete Group",
        description:
          e.message ||
          "There was an error deleting the group. Please try again.",
        duration: 4000,
      });
    }
  };

  const handleOpenEditGroup = async (group) => {
    // await fetchStudents();
    setEditingGroup(group);
    // Start with all current group members selected
    setSelectedStudents(group.students.map((s) => s.id));
    setModalSearchTerm(""); // Reset search when opening
    setShowEditModal(true);
  };

  const handleUpdateGroup = async () => {
    try {
      const groupId = editingGroup.id;
      const originalCount = editingGroup.students?.length || 0;
      const newCount = selectedStudents.length;

      await adminServices.updateGroup(groupId, selectedStudents);
      setShowEditModal(false);
      setEditingGroup(null);
      setSelectedStudents([]);
      fetchGroups();

      // Create a more descriptive message
      let changeMessage = "";
      if (newCount > originalCount) {
        const added = newCount - originalCount;
        changeMessage = `Added ${added} student${
          added > 1 ? "s" : ""
        } to the group.`;
      } else if (newCount < originalCount) {
        const removed = originalCount - newCount;
        changeMessage = `Removed ${removed} student${
          removed > 1 ? "s" : ""
        } from the group.`;
      } else {
        changeMessage = "Group membership updated.";
      }

      showToast({
        variant: "success",
        title: "Group Updated Successfully! ✨",
        description: `"${editingGroup.name}" now has ${newCount} students. ${changeMessage}`,
        duration: 4000,
      });
    } catch (e) {
      console.error("Failed to update group:", e);
      showToast({
        variant: "error",
        title: "Failed to Update Group",
        description: "There was an error updating the group. Please try again.",
        duration: 4000,
      });
    }
  };

  const term = searchTerm.toLowerCase();
  const filteredGroups = groups.filter((group) => {
    const groupName = (group?.name ?? "").toLowerCase();
    const studentMatch = (group?.students ?? []).some((s) => {
      const name = (s?.name ?? "").toLowerCase();
      const email = (s?.email ?? "").toLowerCase();
      return name.includes(term) || email.includes(term);
    });
    return groupName.includes(term) || studentMatch;
  });

  const totalStudents = groups.reduce(
    (acc, group) => acc + (group.students?.length || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <AdminNav initialTab="groups" />

      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Group Management
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Organize students into groups for better collaboration and
            management
          </p>
        </div>

        {/* Search + Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search groups or students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/70 transition-all duration-300 text-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white transition-all duration-300 backdrop-blur-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              onClick={handleOpenAddGroup}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105"
            >
              <UserPlus className="w-4 h-4" />
              Create Group
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Groups
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {groups.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Students
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {totalStudents}
                </p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Avg. per Group
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {groups.length > 0
                    ? Math.round(totalStudents / groups.length)
                    : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-lg">Loading groups...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
              <span className="text-red-400 text-2xl">⚠️</span>
            </div>
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && groups.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-24 h-24 bg-slate-800/50 rounded-3xl flex items-center justify-center">
              <Users className="w-12 h-12 text-slate-400" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-slate-300">
                No groups yet
              </h3>
              <p className="text-slate-500 max-w-md">
                Create your first group to organize students and start
                collaborating
              </p>
            </div>
            <button
              onClick={handleOpenAddGroup}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              Create Your First Group
            </button>
          </div>
        )}

        {/* Group Cards */}
        {!loading && !error && filteredGroups.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroups.map((group, index) => (
              <div
                key={group.id}
                className="group bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/25">
                        {group.name ? group.name[0].toUpperCase() : "G"}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {group.name}
                      </h3>
                      <p className="text-slate-400 flex items-center gap-2 mt-1">
                        <Users className="w-4 h-4" />
                        {group.students?.length ?? 0} students
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEditGroup(group)}
                      className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                    >
                      <Edit className="w-4 h-4 text-slate-400 hover:text-white" />
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group)}
                      className="p-2 hover:bg-red-500/20 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                    </button>
                  </div>
                </div>

                {/* Students List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-slate-300">
                      Students
                    </h4>
                    <span className="text-xs text-slate-500">
                      {group.students?.length ?? 0} members
                    </span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-track-slate-800/30 scrollbar-thumb-slate-600/50 hover:scrollbar-thumb-slate-500/70 scrollbar-thumb-rounded-full">
                    {(group.students ?? []).map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {student.name ? student.name[0].toUpperCase() : "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">
                            {student.name}
                          </p>
                          <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading &&
          !error &&
          groups.length > 0 &&
          filteredGroups.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="w-24 h-24 bg-slate-800/50 rounded-3xl flex items-center justify-center">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-slate-300">
                  No groups found
                </h3>
                <p className="text-slate-500 max-w-md">
                  Try adjusting your search terms or create a new group
                </p>
              </div>
            </div>
          )}
      </div>

      {/* Add Group Modal */}
      {showAddModal && (
        <GroupModal
          title="Create New Group"
          onClose={() => setShowAddModal(false)}
          onConfirm={handleCreateGroup}
          groupName={newGroupName}
          setGroupName={setNewGroupName}
          students={getFilteredStudentsForModal(getAvailableStudents())}
          selectedStudents={selectedStudents}
          toggleStudentSelection={toggleStudentSelection}
          searchTerm={modalSearchTerm}
          setSearchTerm={setModalSearchTerm}
        />
      )}

      {/* Edit Group Modal */}
      {showEditModal && editingGroup && (
        <GroupModal
          title={`Edit Group: ${editingGroup.name}`}
          onClose={() => setShowEditModal(false)}
          onConfirm={handleUpdateGroup}
          groupName={editingGroup.name}
          setGroupName={() => {}} // locked name
          students={getFilteredStudentsForModal(
            getAvailableStudentsForEdit(editingGroup._id),
          )}
          selectedStudents={selectedStudents}
          toggleStudentSelection={toggleStudentSelection}
          editingGroup={editingGroup}
          searchTerm={modalSearchTerm}
          setSearchTerm={setModalSearchTerm}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && groupToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-red-500/30 p-8 w-full max-w-md shadow-2xl shadow-red-500/10 animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Delete Group</h2>
                <p className="text-slate-400 text-sm">
                  This action cannot be undone
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <p className="text-slate-300 mb-4">
                Are you sure you want to delete the group{" "}
                <span className="font-semibold text-white">
                  "{groupToDelete.name}"
                </span>
                ?
              </p>
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Group Details</span>
                </div>
                <p className="text-slate-300 text-sm">
                  • {groupToDelete.students?.length || 0} students will be
                  removed from this group
                </p>
                <p className="text-slate-300 text-sm">
                  • All group data will be permanently deleted
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setGroupToDelete(null);
                }}
                className="px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteGroup}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transform hover:scale-105"
              >
                Delete Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GroupModal = ({
  title,
  onClose,
  onConfirm,
  groupName,
  setGroupName,
  students,
  selectedStudents,
  toggleStudentSelection,
  editingGroup,
  searchTerm,
  setSearchTerm,
}) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 w-full max-w-2xl shadow-2xl shadow-purple-500/10 animate-in fade-in-0 zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800/50 rounded-xl transition-colors text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Group Name (editable only when creating) */}
      {setGroupName && (
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-slate-300">
            Group Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/70 transition-all duration-300"
            />
          </div>
        </div>
      )}

      {/* Students Search */}
      <div className="mb-6">
        <label className="block mb-3 text-sm font-medium text-slate-300">
          Search Students
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-hover:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/70 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Students Selection */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-slate-300">
            Manage Group Members
          </label>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            {searchTerm && (
              <span>
                {students.length} result{students.length !== 1 ? "s" : ""} found
              </span>
            )}
            <span>
              {selectedStudents.length} member
              {selectedStudents.length !== 1 ? "s" : ""} selected
            </span>
          </div>
        </div>

        {setGroupName && (
          <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-xs text-blue-300">
              💡 <strong>Tip:</strong> Uncheck students to remove them from the
              group, or check new students to add them.
            </p>
          </div>
        )}

        <div className="max-h-80 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-track-slate-800/30 scrollbar-thumb-slate-600/50 hover:scrollbar-thumb-slate-500/70 scrollbar-thumb-rounded-full">
          {students.length > 0 ? (
            students.map((student) => {
              const isSelected = selectedStudents.includes(student.id);
              const isCurrentMember =
                editingGroup &&
                editingGroup.students &&
                editingGroup.students.some((s) => s.id === student.id);

              return (
                <label
                  key={student.id}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-purple-500/20 border border-purple-500/30"
                      : "bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleStudentSelection(student.id)}
                      className="w-5 h-5 accent-purple-600 rounded"
                    />
                  </div>

                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                        isCurrentMember && !isSelected
                          ? "bg-red-500/20 border border-red-500/30"
                          : "bg-gradient-to-br from-blue-500 to-purple-600"
                      }`}
                    >
                      {student.name ? student.name[0].toUpperCase() : "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white truncate">
                          {student.name}
                        </p>
                        {isCurrentMember && !isSelected && (
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                            Removing
                          </span>
                        )}
                        {!isCurrentMember && isSelected && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Adding
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
                        <Mail className="w-3 h-3" />
                        {student.email}
                      </p>
                    </div>
                  </div>
                </label>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4">
                {searchTerm ? (
                  <Search className="w-8 h-8 text-slate-400" />
                ) : (
                  <Users className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-slate-300 mb-2">
                {searchTerm ? "No Students Found" : "No Available Students"}
              </h3>
              <p className="text-slate-500 text-sm max-w-xs">
                {searchTerm
                  ? `No students match "${searchTerm}". Try adjusting your search terms.`
                  : "All students are already assigned to groups. Remove students from other groups to make them available."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105"
        >
          {setGroupName ? "Create Group" : "Update Group"}
        </button>
      </div>
    </div>
  </div>
);

export default GroupPane;
