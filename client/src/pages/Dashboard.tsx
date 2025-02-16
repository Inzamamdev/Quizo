import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<
    { id: number; title: string; description: string; created_at: string }[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quiz/quizzes`
      );
      const data = await res.json();
      if (res.ok) {
        setQuizzes(data);
      } else {
        console.error("Failed to fetch quizzes:", data.message);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  // const handleDelete = async (quizId: number) => {
  //   try {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/quiz/quizzes/${quizId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (res.ok) {
  //       setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
  //     } else {
  //       console.error("Failed to delete quiz");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting quiz:", error);
  //   }
  // };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">My Quizzes</h1>

        {quizzes.length === 0 ? (
          <p className="text-gray-500">No quizzes found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-md">
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{quiz.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created on: {new Date(quiz.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      // onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      // onClick={() => handleDelete(quiz.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
