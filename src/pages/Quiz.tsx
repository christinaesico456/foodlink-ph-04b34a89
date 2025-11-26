import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from "lucide-react";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  useEffect(() => {
    recordAction('page_visit', 'Started Knowledge Quiz', 5, '🧠');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      toast.success("Correct Answer!");
    } else {
      toast.error("Incorrect Answer");
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
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,163,37,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-5 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30 mb-6">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Test Your Knowledge</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-foreground leading-tight">
              Hunger <span className="text-primary">Knowledge</span> Quiz
            </h1>
            
            <p className="text-based text-muted-foreground max-w-xl mx-auto">
              Challenge yourself with facts about hunger in the Philippines and learn how you can be part of the solution.
            </p>
          </div>
        </div>
      </section>

      {/* ================= QUIZ SECTION ================= */}
      <section className="relative py-12 md:py-8 -mt-10 z-20">
        
        {/* Top Blender Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* CHANGED: Reduced width from 'max-w-3xl' to 'max-w-xl' */}
          <div className="max-w-xl mx-auto">
            
            {!showScore ? (
              <Card className="relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl 
                p-6 md:p-8" 
                /* CHANGED: Reduced padding from 'p-6 md:p-10' to 'p-6 md:p-8' */
              >
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* Progress Bar */}
                {/* CHANGED: Reduced bottom margin from 'mb-8' to 'mb-6' */}
                <div className="mb-6 relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">
                      Score: {score}
                    </span>
                  </div>
                  <Progress value={(currentQuestion / questions.length) * 100} className="h-2 bg-secondary/20" />
                </div>

                {/* Question */}
                {/* CHANGED: Removed min-height constraint to fit content tightly */}
                <div className="mb-6 relative z-10">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                    {questions[currentQuestion].question}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6 relative z-10">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      /* CHANGED: Reduced padding from 'p-5' to 'p-4' */
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 relative overflow-hidden group ${
                        selectedAnswer === null
                          ? 'border-border/50 bg-white/50 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01] hover:shadow-md'
                          : selectedAnswer === index
                          ? index === questions[currentQuestion].correct
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : index === questions[currentQuestion].correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-border/30 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span className="font-medium text-foreground text-base">{option}</span>
                        {selectedAnswer !== null && (
                          <div className="animate-scale-in">
                            {index === questions[currentQuestion].correct && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                            {selectedAnswer === index && index !== questions[currentQuestion].correct && (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>


                {/* Explanation / Footer */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedAnswer !== null ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-muted/40 border border-primary/10 p-6 rounded-2xl mb-6">
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      Did you know?
                    </h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {questions[currentQuestion].explanation}
                    </p>
                    <p className="text-xs text-muted-foreground border-t border-border/50 pt-3">
                      <strong className="text-primary">Source:</strong> {questions[currentQuestion].source}
                    </p>
                  </div>

                  <Button
                    onClick={handleNextQuestion}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    {currentQuestion === questions.length - 1 ? 'See Final Results' : 'Next Question'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl p-8 md:p-12 text-center rounded-3xl animate-scale-in">
                {/* Confetti/Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex p-6 bg-primary/10 rounded-full mb-8 animate-bounce">
                    <Award className="h-16 w-16 text-primary" />
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black mb-2 text-foreground">
                    Quiz Complete!
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">Here is how you did</p>
                  
                  <div className="mb-10">
                    <div className="text-8xl font-black text-primary mb-2 drop-shadow-sm">
                      {score}<span className="text-4xl text-muted-foreground font-bold">/{questions.length}</span>
                    </div>
                    <div className="inline-block px-6 py-2 bg-background/50 rounded-full border border-border">
                      <p className="text-lg font-medium text-foreground">
                        {score >= 9 && "🏆 Hunger Awareness Expert!"}
                        {score >= 7 && score < 9 && "🌟 Knowledge Champion!"}
                        {score >= 5 && score < 7 && "📚 Good Effort!"}
                        {score < 5 && "💡 Keep Learning!"}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleRestart}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Try Again
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>
      
      {/* Bottom Spacer for Blender Effect */}
      <div className="h-20 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Quiz;