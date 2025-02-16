import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function QuizForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams(); // Get quiz ID from URL params

  const teacher = JSON.parse(localStorage.getItem("user") || "{}");
  const teacher_id = teacher?.id;

  // Fetch quiz details if editing
  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/quiz/quizzes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        })
        .catch(() =>
          toast({
            title: "Failed to fetch quiz details",
            variant: "destructive",
          })
        );
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError(["Title and description are required"]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quiz/quizzes${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, teacher_id }),
        }
      );
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast({ title: data.message });
        navigate("/dashboard");
      } else {
        setError(data.errors || ["Failed to save quiz"]);
      }
    } catch {
      setLoading(false);
      toast({ title: "Server error!", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen justify-center items-center bg-gray-100">
        <Card className="w-[500px] p-6 shadow-lg rounded-lg bg-white mx-5">
          <CardHeader>
            <CardTitle>{id ? "Edit Quiz" : "Create a New Quiz"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Quiz Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {error.length > 0 && (
                <div className="text-red-500">
                  {error.map((err, index) => (
                    <p key={index}>{err}</p>
                  ))}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : id ? "Update Quiz" : "Create Quiz"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
