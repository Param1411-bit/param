import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Mail,
  Save,
  LogOut,
  Loader2,
  Plus,
  Trash2,
  Upload,
  FolderOpen,
  Award,
} from "lucide-react";
import { Session } from "@supabase/supabase-js";

interface HeroData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

interface Responsibility {
  title: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  coursework?: string[];
  grade?: string;
}

interface Project {
  title: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
}

interface Skills {
  software: string[];
  hardware: string[];
  domains: string[];
  programming: string[];
}

interface ContactData {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  // Data states
  const [hero, setHero] = useState<HeroData>({
    name: "",
    title: "",
    summary: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [responsibilities, setResponsibilities] = useState<Responsibility[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skills>({
    software: [],
    hardware: [],
    domains: [],
    programming: [],
  });
  const [contact, setContact] = useState<ContactData>({
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    location: "",
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        fetchAllData();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const { data, error } = await supabase
        .from("profile_settings")
        .select("key, value");

      if (error) throw error;

      data?.forEach((item) => {
        const value = item.value as any;
        switch (item.key) {
          case "hero":
            setHero(value);
            break;
          case "experiences":
            setExperiences(value);
            break;
          case "responsibilities":
            setResponsibilities(value);
            break;
          case "education":
            setEducation(value);
            break;
          case "projects":
            setProjects(value);
            break;
          case "skills":
            setSkills(value);
            break;
          case "contact":
            setContact(value);
            break;
        }
      });

      // Fetch profile image
      const { data: imageData } = await supabase.storage
        .from("profile-images")
        .getPublicUrl("profile.png");
      
      setProfileImageUrl(imageData.publicUrl + "?t=" + Date.now());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (key: string, value: any) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profile_settings")
        .update({ value })
        .eq("key", key);

      if (error) throw error;
      toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} saved!`);
    } catch (error: any) {
      toast.error(error.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async () => {
    if (!profileImage) return;

    setSaving(true);
    try {
      const { error } = await supabase.storage
        .from("profile-images")
        .upload("profile.png", profileImage, { upsert: true });

      if (error) throw error;
      
      setProfileImageUrl(
        supabase.storage.from("profile-images").getPublicUrl("profile.png").data.publicUrl +
          "?t=" +
          Date.now()
      );
      setProfileImage(null);
      toast.success("Profile image updated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const tabs = [
    { id: "hero", label: "Profile", icon: User },
    { id: "experiences", label: "Experience", icon: Briefcase },
    { id: "responsibilities", label: "Positions", icon: Award },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "skills", label: "Skills", icon: Code },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              View Portfolio
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero/Profile Tab */}
              {activeTab === "hero" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  
                  {/* Profile Image Upload */}
                  <div className="mb-8">
                    <Label className="mb-2 block">Profile Image</Label>
                    <div className="flex items-center gap-4">
                      {profileImageUrl && (
                        <img
                          src={profileImageUrl}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-2 border-primary/50"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                          className="mb-2"
                        />
                        <Button
                          size="sm"
                          onClick={uploadImage}
                          disabled={!profileImage || saving}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={hero.name}
                        onChange={(e) => setHero({ ...hero, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={hero.title}
                        onChange={(e) => setHero({ ...hero, title: e.target.value })}
                        placeholder="Data Analytics • Business Analysis"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea
                        id="summary"
                        value={hero.summary}
                        onChange={(e) => setHero({ ...hero, summary: e.target.value })}
                        placeholder="Brief description about yourself"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={hero.email}
                        onChange={(e) => setHero({ ...hero, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={hero.phone}
                        onChange={(e) => setHero({ ...hero, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub URL</Label>
                      <Input
                        id="github"
                        value={hero.github}
                        onChange={(e) => setHero({ ...hero, github: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn URL</Label>
                      <Input
                        id="linkedin"
                        value={hero.linkedin}
                        onChange={(e) => setHero({ ...hero, linkedin: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button
                    className="mt-6"
                    onClick={() => saveData("hero", hero)}
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Profile
                  </Button>
                </Card>
              )}

              {/* Experiences Tab */}
              {activeTab === "experiences" && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Work Experience</h2>
                    <Button
                      size="sm"
                      onClick={() =>
                        setExperiences([
                          ...experiences,
                          { title: "", company: "", period: "", achievements: [""] },
                        ])
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {experiences.map((exp, index) => (
                      <Card key={index} className="p-4 bg-secondary/30">
                        <div className="flex justify-between mb-4">
                          <Badge>Experience {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExperiences(experiences.filter((_, i) => i !== index))
                            }
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Job Title</Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => {
                                const newExp = [...experiences];
                                newExp[index].title = e.target.value;
                                setExperiences(newExp);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const newExp = [...experiences];
                                newExp[index].company = e.target.value;
                                setExperiences(newExp);
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Period</Label>
                            <Input
                              value={exp.period}
                              onChange={(e) => {
                                const newExp = [...experiences];
                                newExp[index].period = e.target.value;
                                setExperiences(newExp);
                              }}
                              placeholder="Jan 2024 – Present"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Achievements (one per line)</Label>
                            <Textarea
                              value={exp.achievements.join("\n")}
                              onChange={(e) => {
                                const newExp = [...experiences];
                                newExp[index].achievements = e.target.value.split("\n");
                                setExperiences(newExp);
                              }}
                              rows={4}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button
                    className="mt-6"
                    onClick={() => saveData("experiences", experiences)}
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Experiences
                  </Button>
                </Card>
              )}

              {/* Responsibilities Tab */}
              {activeTab === "responsibilities" && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Positions of Responsibility</h2>
                    <Button
                      size="sm"
                      onClick={() =>
                        setResponsibilities([
                          ...responsibilities,
                          { title: "", period: "", description: "" },
                        ])
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Position
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {responsibilities.map((pos, index) => (
                      <Card key={index} className="p-4 bg-secondary/30">
                        <div className="flex justify-between mb-4">
                          <Badge>Position {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setResponsibilities(responsibilities.filter((_, i) => i !== index))
                            }
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={pos.title}
                              onChange={(e) => {
                                const newPos = [...responsibilities];
                                newPos[index].title = e.target.value;
                                setResponsibilities(newPos);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Period</Label>
                            <Input
                              value={pos.period}
                              onChange={(e) => {
                                const newPos = [...responsibilities];
                                newPos[index].period = e.target.value;
                                setResponsibilities(newPos);
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              value={pos.description}
                              onChange={(e) => {
                                const newPos = [...responsibilities];
                                newPos[index].description = e.target.value;
                                setResponsibilities(newPos);
                              }}
                              rows={3}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button
                    className="mt-6"
                    onClick={() => saveData("responsibilities", responsibilities)}
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Positions
                  </Button>
                </Card>
              )}

              {/* Education Tab */}
              {activeTab === "education" && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Education</h2>
                    <Button
                      size="sm"
                      onClick={() =>
                        setEducation([
                          ...education,
                          { degree: "", institution: "", period: "", coursework: [], grade: "" },
                        ])
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <Card key={index} className="p-4 bg-secondary/30">
                        <div className="flex justify-between mb-4">
                          <Badge>Education {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setEducation(education.filter((_, i) => i !== index))
                            }
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].degree = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].institution = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Period</Label>
                            <Input
                              value={edu.period}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].period = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Grade (optional)</Label>
                            <Input
                              value={edu.grade || ""}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].grade = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Coursework (comma separated)</Label>
                            <Input
                              value={edu.coursework?.join(", ") || ""}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].coursework = e.target.value.split(",").map((s) => s.trim());
                                setEducation(newEdu);
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button
                    className="mt-6"
                    onClick={() => saveData("education", education)}
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Education
                  </Button>
                </Card>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Projects</h2>
                    <Button
                      size="sm"
                      onClick={() =>
                        setProjects([
                          ...projects,
                          { title: "", period: "", description: "", achievements: [""], tags: [] },
                        ])
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <Card key={index} className="p-4 bg-secondary/30">
                        <div className="flex justify-between mb-4">
                          <Badge>Project {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setProjects(projects.filter((_, i) => i !== index))
                            }
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={project.title}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].title = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Period</Label>
                            <Input
                              value={project.period}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].period = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].description = e.target.value;
                                setProjects(newProjects);
                              }}
                              rows={2}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Achievements (one per line)</Label>
                            <Textarea
                              value={project.achievements.join("\n")}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].achievements = e.target.value.split("\n");
                                setProjects(newProjects);
                              }}
                              rows={3}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Tags (comma separated)</Label>
                            <Input
                              value={project.tags.join(", ")}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].tags = e.target.value.split(",").map((s) => s.trim());
                                setProjects(newProjects);
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button
                    className="mt-6"
                    onClick={() => saveData("projects", projects)}
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Projects
                  </Button>
                </Card>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Skills</h2>

                  <div className="space-y-6">
                    <div>
                      <Label>Software & Tools (comma separated)</Label>
                      <Input
                        value={skills.software.join(", ")}
                        onChange={(e) =>
                          setSkills({
                            ...skills,
                            software: e.target.value.split(",").map((s) => s.trim()),
                          })
                        }
                        placeholder="Excel, Power BI, Tableau"
                      />
                    </div>
                    <div>
                      <Label>Domains (comma separated)</Label>
                      <Input
                        value={skills.domains.join(", ")}
                        onChange={(e) =>
                          setSkills({
                            ...skills,
                            domains: e.target.value.split(",").map((s) => s.trim()),
                          })
                        }
                        placeholder="Data Analytics, Machine Learning"
                      />
                    </div>
                    <div>
                      <Label>Programming Languages (comma separated)</Label>
                      <Input
                        value={skills.programming.join(", ")}
                        onChange={(e) =>
                          setSkills({
                            ...skills,
                            programming: e.target.value.split(",").map((s) => s.trim()),
                          })
                        }
                        placeholder="Python, SQL, JavaScript"
                      />
                    </div>
                    <div>
                      <Label>Hardware (comma separated)</Label>
                      <Input
                        value={skills.hardware.join(", ")}
                        onChange={(e) =>
                          setSkills({
                            ...skills,
                            hardware: e.target.value.split(",").map((s) => s.trim()),
                          })
                        }
                        placeholder="Arduino, Raspberry Pi"
                      />
                    </div>
                  </div>

                  <Button
                    className="mt-6"
                    onClick={() => saveData("skills", skills)}
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Skills
                  </Button>
                </Card>
              )}

              {/* Contact Tab */}
              {activeTab === "contact" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input
                        id="contactPhone"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactGithub">GitHub URL</Label>
                      <Input
                        id="contactGithub"
                        value={contact.github}
                        onChange={(e) => setContact({ ...contact, github: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactLinkedin">LinkedIn URL</Label>
                      <Input
                        id="contactLinkedin"
                        value={contact.linkedin}
                        onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={contact.location}
                        onChange={(e) => setContact({ ...contact, location: e.target.value })}
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>

                  <Button
                    className="mt-6"
                    onClick={() => saveData("contact", contact)}
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Contact
                  </Button>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
