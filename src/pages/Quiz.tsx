import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, XCircle, Award, RotateCcw } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  source: string;
}

const Quiz = () => {
  const { recordAction } = useGamification();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const questions: Question[] = [
    {
      question: "According to the Philippine Statistics Authority (2021), approximately how many Filipinos experience involuntary hunger?",
      options: ["1.2 million", "2.3 million", "4.5 million", "6.1 million"],
      correct: 1,
      explanation: "The PSA reported that approximately 2.3 million Filipinos (ages 5+) experienced involuntary hunger at least once in the past 3 months.",
      source: "Philippine Statistics Authority (PSA), 2021 National Nutrition Survey"
    },
    {
      question: "What percentage of Filipino children under 5 are stunted due to chronic malnutrition?",
      options: ["12.5%", "21.3%", "26.8%", "33.4%"],
      correct: 3,
      explanation: "According to UNICEF and WHO data, approximately 33.4% of Filipino children under 5 suffer from stunting, indicating chronic malnutrition.",
      source: "UNICEF Philippines & WHO, 2022 Nutrition Report"
    },
    {
      question: "How much food is wasted in the Philippines annually while millions go hungry?",
      options: ["2 million tons", "5.1 million tons", "9.8 million tons", "12.3 million tons"],
      correct: 2,
      explanation: "The Philippines wastes approximately 9.8 million tons of food annually, equivalent to ₱23.5 billion worth of edible food.",
      source: "Department of Environment and Natural Resources (DENR), 2020"
    },
    {
      question: "What is the primary cause of food insecurity in Cavite Province?",
      options: ["Natural disasters", "Poverty and unemployment", "Agricultural decline", "All of the above"],
      correct: 3,
      explanation: "Food insecurity in Cavite is multifaceted, caused by poverty (20.3% poverty incidence in rural areas), rapid urbanization reducing farmland, and vulnerability to typhoons and floods.",
      source: "Cavite Provincial Planning and Development Office, 2022"
    },
    {
      question: "How many active feeding programs operate in Cavite Province?",
      options: ["50-100 programs", "150-200 programs", "250-300 programs", "Over 450 programs"],
      correct: 3,
      explanation: "There are over 450 active feeding programs across Cavite, run by LGUs, NGOs, and community organizations, serving approximately 50,000 individuals monthly.",
      source: "Cavite Provincial Social Welfare and Development Office, 2023"
    },
    {
      question: "Which UN Sustainable Development Goal focuses on ending hunger?",
      options: ["SDG 1: No Poverty", "SDG 2: Zero Hunger", "SDG 3: Good Health", "SDG 10: Reduced Inequalities"],
      correct: 1,
      explanation: "SDG 2 aims to end hunger, achieve food security and improved nutrition, and promote sustainable agriculture by 2030.",
      source: "United Nations Sustainable Development Goals"
    },
    {
      question: "What percentage of Cavite's population has been reached by hunger relief programs in 2023?",
      options: ["8.2%", "12.6%", "18.4%", "25.7%"],
      correct: 1,
      explanation: "Based on Cavite's population of ~4.3 million, the 50,000+ individuals served monthly represents approximately 8.2% population coverage, indicating significant room for expansion.",
      source: "Calculated from Cavite PSWDO & PSA 2023 data"
    },
    {
      question: "How much does it cost on average to provide one nutritious meal through feeding programs in the Philippines?",
      options: ["₱15-20", "₱35-50", "₱75-100", "₱120-150"],
      correct: 1,
      explanation: "Most community feeding programs in the Philippines provide a nutritious meal for ₱35-50, including rice, protein, vegetables, and sometimes fruit.",
      source: "Philippine NGO Coalition Against Hunger, 2023"
    },
    {
      question: "Which barangays in Cavite have the highest rates of child malnutrition?",
      options: ["Coastal communities", "Urban poor areas", "Rural mountainous regions", "Industrial zones"],
      correct: 2,
      explanation: "Data shows that rural mountainous barangays in Maragondon, Alfonso, and Magallanes have the highest malnutrition rates due to geographic isolation and limited livelihood opportunities.",
      source: "Cavite Provincial Nutrition Council, 2022 Assessment"
    },
    {
      question: "What is the most effective long-term solution to food insecurity according to research?",
      options: ["Continuous food donations", "Livelihood programs and education", "Emergency food relief", "International aid"],
      correct: 1,
      explanation: "Research consistently shows that sustainable livelihood programs, skills training, and nutrition education create lasting food security, while emergency aid addresses immediate needs.",
      source: "World Bank & FAO Joint Report on Food Security, 2022"
    }
  ];

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      recordAction('learn_fact', 'Answered Correctly', 15, '✅');
      toast.success("Correct! " + questions[currentQuestion].explanation);
    } else {
      toast.error("Incorrect. " + questions[currentQuestion].explanation);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
      if (score >= 7) {
        recordAction('learn_fact', 'Completed Quiz - Expert', 50, '🏆');
      } else {
        recordAction('learn_fact', 'Completed Quiz', 30, '📚');
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnsweredQuestions([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30 mb-6">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Test Your Knowledge</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-foreground">
              Hunger <span className="text-primary">Knowledge</span> Quiz
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Learn facts about hunger in the Philippines and test your understanding
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!showScore ? (
              <Card className="glass-card p-6 md:p-10">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-muted-foreground">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      Score: {score}/{questions.length}
                    </span>
                  </div>
                  <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
                </div>

                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
                  {questions[currentQuestion].question}
                </h2>

                {/* Options */}
                <div className="space-y-4 mb-8">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                        selectedAnswer === null
                          ? 'border-border hover:border-primary/50 hover:bg-primary/5'
                          : selectedAnswer === index
                          ? index === questions[currentQuestion].correct
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : index === questions[currentQuestion].correct
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-border opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{option}</span>
                        {selectedAnswer !== null && (
                          <>
                            {index === questions[currentQuestion].correct && (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            )}
                            {selectedAnswer === index && index !== questions[currentQuestion].correct && (
                              <XCircle className="h-6 w-6 text-red-500" />
                            )}
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Source */}
                {selectedAnswer !== null && (
                  <div className="mb-6 p-4 bg-muted/30 rounded-lg animate-fade-in">
                    <p className="text-sm text-muted-foreground">
                      <strong>Source:</strong> {questions[currentQuestion].source}
                    </p>
                  </div>
                )}

                {/* Next Button */}
                {selectedAnswer !== null && (
                  <Button
                    onClick={handleNextQuestion}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    size="lg"
                  >
                    {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
                  </Button>
                )}
              </Card>
            ) : (
              <Card className="glass-card p-6 md:p-10 text-center">
                <Award className="h-20 w-20 mx-auto mb-6 text-primary" />
                
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
                  Quiz Complete!
                </h2>
                
                <div className="text-6xl font-black mb-6 text-primary">
                  {score}/{questions.length}
                </div>
                
                <p className="text-xl text-muted-foreground mb-8">
                  {score >= 9 && "Outstanding! You're a hunger awareness expert! 🏆"}
                  {score >= 7 && score < 9 && "Great job! You have strong knowledge about hunger issues. 🌟"}
                  {score >= 5 && score < 7 && "Good effort! Keep learning about hunger solutions. 📚"}
                  {score < 5 && "Thanks for participating! Explore our site to learn more. 💡"}
                </p>
                
                <Button
                  onClick={handleRestart}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  size="lg"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;