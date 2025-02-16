import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quiz/quizzes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        }
      );

      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert("Error creating quiz!");
      }
    } catch (error) {
      console.error(error);
      alert("Server error!");
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen justify-center items-center bg-gray-100">
        <Card className="w-[500px] h-[400px] p-6 shadow-lg rounded-lg bg-white mx-5">
          <CardHeader>
            <CardTitle>Create a New Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Quiz Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Create Quiz
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
