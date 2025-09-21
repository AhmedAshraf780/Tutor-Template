import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Clock,
  FileText,
  Tag,
  Star,
  BookMarked,
  Plus,
  Grid,
  List,
  ChevronRight,
  X,
  Save,
} from "lucide-react";
import StudentNav from "./shared/nav";
import { studentServices } from "@/services/studentServices";
import { useToast } from "@/components/ui/toast";

const NotesPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    lesson: "",
    description: "",
  });

  const { showToast } = useToast();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await studentServices.getNotes();
    if (res.success) setNotesData(res.notes);
  };

  const handleAddNote = async () => {
    if (newNote.title && newNote.lesson && newNote.description) {
      const note = {
        title: newNote.title,
        lesson: newNote.lesson,
        description: newNote.description,
        date: new Date().toISOString().split("T")[0],
      };

      alert("sending request notes");
      const res = await studentServices.createNote(note);
      alert("got notes request");

      if (res.success) {
        showToast({
          variant: "success",
          title: "Note Created Successfully...",
        });
      }
      setNotesData([...notesData, note]);
      setNewNote({ title: "", lesson: "", description: "" });
      setIsPopoverOpen(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewNote((prev) => ({ ...prev, [field]: value }));
  };

  const filteredNotes = notesData.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.lesson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const NoteCard = ({ note }) => (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 group cursor-pointer h-64 flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
            {note.title}
          </h3>
          <p className="text-sm text-blue-400 font-medium mb-3 line-clamp-1">
            Lesson: {note.lesson}
          </p>
          <p className="text-slate-300 text-sm leading-relaxed break-words line-clamp-4">
            {note.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-700/50 mt-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar className="h-3 w-3" />
            <span>{new Date(note.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const NoteListItem = ({ note }) => (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 hover:bg-slate-800/60 transition-all duration-200 group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
              {note.title}
            </h3>
          </div>
          <p className="text-sm text-blue-400 mb-2">Lesson: {note.lesson}</p>
          <p className="text-xs text-slate-300 break-words line-clamp-2">
            {note.description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar className="h-3 w-3" />
            <span>{new Date(note.date).toLocaleDateString()}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-300 transition-colors" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <StudentNav initialTab="notes" />

      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                  Study Notes
                </h1>
                <p className="text-slate-400 mt-2">
                  Access and manage your learning materials
                </p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Note
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-slate-900 border-2 border-slate-600 shadow-2xl backdrop-blur-sm">
                  <div className="space-y-4 bg-slate-900 p-1 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        Create New Note
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-1 block">
                          Note Title
                        </label>
                        <input
                          type="text"
                          value={newNote.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          placeholder="Enter note title..."
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-1 block">
                          Lesson Name
                        </label>
                        <input
                          type="text"
                          value={newNote.lesson}
                          onChange={(e) =>
                            handleInputChange("lesson", e.target.value)
                          }
                          placeholder="Enter lesson name..."
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-1 block">
                          Description
                        </label>
                        <textarea
                          value={newNote.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Enter note description..."
                          rows={3}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                        />
                      </div>
                      <Button
                        onClick={handleAddNote}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                        disabled={
                          !newNote.title ||
                          !newNote.lesson ||
                          !newNote.description
                        }
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Create Note
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search notes by title or lesson name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/40 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <div className="flex border border-slate-700 rounded-lg p-1 bg-slate-800/40">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`h-8 px-3 ${viewMode === "grid" ? "" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`h-8 px-3 ${viewMode === "list" ? "" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <NoteListItem key={note.id} note={note} />
              ))}
            </div>
          )}

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-12 max-w-md mx-auto">
                <BookOpen className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {searchQuery ? "No notes found" : "No notes yet"}
                </h3>
                <p className="text-slate-400 mb-6">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Click the 'Add New Note' button to create your first study note"}
                </p>
                {!searchQuery && (
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Note
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-slate-800 border border-slate-700 shadow-2xl">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white">
                            Create New Note
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsPopoverOpen(false)}
                            className="text-slate-400 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-slate-300 mb-1 block">
                              Note Title
                            </label>
                            <input
                              type="text"
                              value={newNote.title}
                              onChange={(e) =>
                                handleInputChange("title", e.target.value)
                              }
                              placeholder="Enter note title..."
                              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-300 mb-1 block">
                              Lesson Name
                            </label>
                            <input
                              type="text"
                              value={newNote.lesson}
                              onChange={(e) =>
                                handleInputChange("lesson", e.target.value)
                              }
                              placeholder="Enter lesson name..."
                              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-300 mb-1 block">
                              Description
                            </label>
                            <textarea
                              value={newNote.description}
                              onChange={(e) =>
                                handleInputChange("description", e.target.value)
                              }
                              placeholder="Enter note description..."
                              rows={3}
                              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                            />
                          </div>
                          <Button
                            onClick={handleAddNote}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            disabled={
                              !newNote.title ||
                              !newNote.lesson ||
                              !newNote.description
                            }
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Create Note
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
