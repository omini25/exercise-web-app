"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Flame, Target, Zap, Play, Pause, SkipForward, X, Coffee } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface WorkoutPlan {
  id: string
  name: string
  duration: number
  intensity: "Low" | "Medium" | "High"
  exercises: string[]
  type: "cardio" | "strength" | "flexibility" | "hiit"
  shuffledExercises?: string[]
}

const exerciseDescriptions: Record<string, string> = {
  "Jumping Jacks":
    "Stand with feet together, arms at sides. Jump while spreading legs shoulder-width apart and raising arms overhead. Jump back to starting position.",
  "High Knees":
    "Stand tall and run in place, bringing your knees up toward your chest as high as possible. Keep your core engaged and pump your arms.",
  Burpees:
    "Start standing, drop into squat, place hands on floor, jump feet back to plank, do a push-up, jump feet forward, then jump up with arms overhead.",
  "Mountain Climbers":
    "Start in plank position. Alternate bringing knees toward chest in a running motion while keeping your core tight and hips level.",
  "Push-ups":
    "Start in plank position with hands shoulder-width apart. Lower your body until chest nearly touches floor, then push back up.",
  Squats:
    "Stand with feet shoulder-width apart. Lower your body by bending knees and pushing hips back as if sitting in a chair. Return to standing.",
  Lunges:
    "Step forward with one leg, lowering your hips until both knees are bent at 90 degrees. Push back to starting position and repeat with other leg.",
  Plank:
    "Hold a push-up position with your body in a straight line from head to heels. Keep your core engaged and breathe steadily.",
  "Wall Sit":
    "Lean against a wall with feet shoulder-width apart. Slide down until thighs are parallel to floor. Hold this position.",
  "Jump Squats":
    "Perform a regular squat, then explode up into a jump. Land softly and immediately lower into the next squat.",
  "Cat-Cow Stretch":
    "Start on hands and knees. Arch your back and look up (cow), then round your spine and tuck chin to chest (cat).",
  "Child's Pose":
    "Kneel on floor, touch big toes together, sit back on heels. Separate knees and fold forward, extending arms in front.",
  "Seated Forward Fold":
    "Sit with legs extended. Slowly fold forward from hips, reaching toward your feet while keeping spine long.",
  "Leg Raises":
    "Lie on back with hands at sides. Keep legs straight and lift them up to 90 degrees, then slowly lower without touching the floor.",
  "Butt Kicks": "Stand tall and run in place, kicking your heels up towards your glutes. Keep your core engaged.",
  "Side Lunges":
    "Stand with feet together. Step out to one side and lower your hips, keeping the other leg straight. Return to the start and switch sides.",
  Crunches: "Lie on your back with knees bent and feet flat on the floor. Place your hands behind your head and lift your upper back off the floor.",
  "Bicycle Crunches":
    "Lie on your back and bring your knees towards your chest. Alternate touching your elbow to the opposite knee in a pedaling motion.",
  "Flutter Kicks": "Lie on your back with legs straight. Lift your heels off the floor and make small, rapid up-and-down movements.",
  "Glute Bridges":
    "Lie on your back with knees bent and feet flat on the floor. Lift your hips off the floor until your body forms a straight line from shoulders to knees.",
  "Arm Circles": "Stand with arms extended to the sides. Make small circles with your arms, then reverse the direction.",
  "Tricep Dips":
    "Sit on the edge of a chair or step. Place your hands on the edge, fingers pointing forward. Slide your hips forward and lower your body by bending your elbows.",
  Rest: "Take a short break. Breathe deeply and prepare for the next exercise.",
}

const exerciseImages: Record<string, string> = {
  "Jumping Jacks": "/jumping-jacks.png",
  "High Knees": "/high-knees-exercise.png",
  Burpees: "/placeholder-cnfv0.png",
  "Mountain Climbers": "/mountain-climber-plank.png",
  "Push-ups": "/push-up-exercise.png",
  Squats: "/bodyweight-squat.png",
  Lunges: "/lunge-exercise.png",
  Plank: "/plank-exercise.png",
  "Wall Sit": "/wall-sit-exercise.png",
  "Jump Squats": "/jump-squat-exercise.png",
  "Cat-Cow Stretch": "/cat-cow-yoga.png",
  "Child's Pose": "/child-pose-yoga.png",
  "Seated Forward Fold": "/seated-forward-fold.png",
  "Leg Raises": "/leg-raises-exercise.png",
  "Butt Kicks": "/placeholder.svg",
  "Side Lunges": "/placeholder.svg",
  Crunches: "/placeholder.svg",
  "Bicycle Crunches": "/placeholder.svg",
  "Flutter Kicks": "/placeholder.svg",
  "Glute Bridges": "/placeholder.svg",
  "Arm Circles": "/placeholder.svg",
  "Tricep Dips": "/placeholder.svg",
  Rest: "/rest.png",
}

const workoutPlans: WorkoutPlan[] = [
  {
    id: "morning-cardio",
    name: "Morning Energy Boost",
    duration: 20,
    intensity: "Medium",
    type: "cardio",
    exercises: ["Jumping Jacks", "High Knees", "Burpees", "Mountain Climbers", "Butt Kicks"],
  },
  {
    id: "evening-strength",
    name: "Evening Strength Builder",
    duration: 30,
    intensity: "High",
    type: "strength",
    exercises: ["Push-ups", "Squats", "Lunges", "Plank", "Wall Sit", "Tricep Dips", "Glute Bridges"],
  },
  {
    id: "morning-hiit",
    name: "Morning HIIT Blast",
    duration: 15,
    intensity: "High",
    type: "hiit",
    exercises: ["Burpees", "Jump Squats", "Push-ups", "High Knees", "Mountain Climbers"],
  },
  {
    id: "evening-flexibility",
    name: "Evening Wind Down",
    duration: 25,
    intensity: "Low",
    type: "flexibility",
    exercises: ["Cat-Cow Stretch", "Child's Pose", "Seated Forward Fold", "Leg Raises", "Side Lunges", "Arm Circles"],
  },
  {
    id: "morning-fat-burner",
    name: "Fat Burner AM",
    duration: 20,
    intensity: "High",
    type: "hiit",
    exercises: ["Jumping Jacks", "Burpees", "High Knees", "Flutter Kicks", "Bicycle Crunches"],
  },
  {
    id: "evening-core-crusher",
    name: "Core Crusher PM",
    duration: 20,
    intensity: "Medium",
    type: "strength",
    exercises: ["Crunches", "Bicycle Crunches", "Leg Raises", "Plank", "Flutter Kicks", "Glute Bridges"],
  },
]

const playSound = (sound: string) => {
  try {
    const audio = new Audio(`/sounds/${sound}.mp3`)
    audio.play()
  } catch (error) {
    console.error(`Error playing sound: ${sound}`, error)
  }
}

function WorkoutExecution({
  workout,
  onClose,
  exerciseTime: userExerciseTime,
  restTime: userRestTime,
}: {
  workout: WorkoutPlan
  onClose: (completed: boolean) => void
  exerciseTime: number
  restTime: number
}) {
  // Add Rest to exercises if rest time is set
  const exercisesWithRest = [...workout.exercises]
  if (userRestTime > 0 && !workout.exercises.includes("Rest")) {
    for (let i = workout.exercises.length - 1; i > 0; i--) {
      exercisesWithRest.splice(i, 0, "Rest")
    }
  }
  
  const exercises = workout.shuffledExercises || exercisesWithRest
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isPreparation, setIsPreparation] = useState(true)
  const [timeLeft, setTimeLeft] = useState(10) // 10 seconds preparation
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentExercise = exercises[currentExerciseIndex]

  // Use user-defined times or default to calculated values for backward compatibility
  const defaultExerciseTime = (() => {
    const hasRest = exercises.includes("Rest")
    const exerciseCount = exercises.length - (hasRest ? 1 : 0)
    const totalDurationInSeconds = workout.duration * 60 - (hasRest ? 30 : 0)
    return Math.floor(totalDurationInSeconds / exerciseCount)
  })()
  
  const exerciseTime = userExerciseTime || defaultExerciseTime
  const restTime = userRestTime || (exercises.includes("Rest") ? 30 : 0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (isPreparation) {
        // Preparation finished, start exercise
        setIsPreparation(false)
        if (currentExercise === "Rest") {
          playSound("rest")
          setTimeLeft(30) // 30s rest
        } else {
          playSound("next")
          setTimeLeft(exerciseTime)
        }
      } else {
        // Exercise finished, move to next or end workout
        if (currentExerciseIndex < exercises.length - 1) {
          setCurrentExerciseIndex((prev) => prev + 1)
          setIsPreparation(true)
          setTimeLeft(10) // 10s prep for next
        } else {
          // Workout completed
          playSound("complete")
          onClose(true)
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, isPaused, timeLeft, isPreparation, currentExerciseIndex, exercises, onClose, currentExercise, exerciseTime])

  const startWorkout = () => {
    playSound("start")
    setIsRunning(true)
    setIsPaused(false)
  }

  const pauseWorkout = () => {
    setIsPaused(!isPaused)
  }

  const skipExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1)
      setIsPreparation(true)
      setTimeLeft(10)
    } else {
      playSound("complete")
      onClose(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{workout.name}</CardTitle>
            <CardDescription>
              Exercise {currentExerciseIndex + 1} of {exercises.length}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onClose(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">{formatTime(timeLeft)}</div>
            <div className="text-lg font-medium">
              {isPreparation ? `Get Ready: ${currentExercise}` : currentExercise}
            </div>
          </div>

          {/* Exercise Image and Description */}
          <div className="flex flex-col items-center space-y-4">
            {currentExercise === "Rest" ? (
              <div className="flex flex-col items-center justify-center h-48 w-48">
                <Coffee className="h-24 w-24 text-primary" />
                <p className="text-lg font-semibold mt-4">Rest Time</p>
              </div>
            ) : (
              <img
                src={exerciseImages[currentExercise] || "/placeholder.svg"}
                alt={currentExercise}
                className="w-48 h-48 rounded-lg object-cover border"
              />
            )}
            <div className="text-center max-w-md">
              <h3 className="font-semibold text-lg mb-2">{currentExercise}</h3>
              <p className="text-muted-foreground">
                {exerciseDescriptions[currentExercise] || "Follow the exercise shown in the image."}
              </p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            {!isRunning ? (
              <Button onClick={startWorkout} size="lg" className="px-8">
                <Play className="h-5 w-5 mr-2" />
                Start Workout
              </Button>
            ) : (
              <>
                <Button onClick={pauseWorkout} variant="outline" size="lg">
                  <Pause className="h-5 w-5 mr-2" />
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button onClick={skipExercise} variant="outline" size="lg">
                  <SkipForward className="h-5 w-5 mr-2" />
                  Skip
                </Button>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentExerciseIndex + (isPreparation ? 0 : 1)) / exercises.length) * 100}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TimePlanner({
  workout,
  onPlan,
  onCancel,
}: {
  workout: WorkoutPlan
  onPlan: (exerciseTime: number, restTime: number) => void
  onCancel: () => void
}) {
  const [exerciseTime, setExerciseTime] = useState(30)
  const [restTime, setRestTime] = useState(30)

  // Calculate default times based on workout duration
  useEffect(() => {
    const hasRest = workout.exercises.includes("Rest")
    const exerciseCount = workout.exercises.length - (hasRest ? 1 : 0)
    const totalDurationInSeconds = workout.duration * 60 - (hasRest ? 30 : 0)
    const defaultExerciseTime = Math.floor(totalDurationInSeconds / exerciseCount)
    
    setExerciseTime(defaultExerciseTime)
    setRestTime(hasRest ? 30 : 0)
  }, [workout])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Plan Your Workout Time</CardTitle>
          <CardDescription>Set duration for exercises and rest periods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="exercise-time" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Exercise Duration (seconds)
              </Label>
              <Input
                id="exercise-time"
                type="number"
                min="10"
                max="300"
                value={exerciseTime}
                onChange={(e) => setExerciseTime(Number(e.target.value))}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                How long you want to spend on each exercise
              </p>
            </div>
            
            <div>
              <Label htmlFor="rest-time" className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                Rest Duration (seconds)
              </Label>
              <Input
                id="rest-time"
                type="number"
                min="0"
                max="120"
                value={restTime}
                onChange={(e) => setRestTime(Number(e.target.value))}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Time to rest between exercises (0 for no rest)
              </p>
            </div>
          </div>
          
          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => onPlan(exerciseTime, restTime)} className="flex-1">
              Start Workout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function FitnessScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [schedule, setSchedule] = useState<Record<string, { morning?: WorkoutPlan; evening?: WorkoutPlan }>>({})
  const [completed, setCompleted] = useState<Record<string, { morning?: boolean; evening?: boolean }>>({})
  const [streak, setStreak] = useState(0)
  const [activeWorkout, setActiveWorkout] = useState<{
    plan: WorkoutPlan
    date: Date
    timeSlot: "morning" | "evening"
  } | null>(null)
  const [showTimePlanner, setShowTimePlanner] = useState(false)
  const [plannedWorkout, setPlannedWorkout] = useState<{
    plan: WorkoutPlan
    date: Date
    timeSlot: "morning" | "evening"
  } | null>(null)
  const [userExerciseTime, setUserExerciseTime] = useState(30)
  const [userRestTime, setUserRestTime] = useState(15)

  useEffect(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const scheduleKey = `exercise-schedule-${currentYear}-${currentMonth}`
    const completedKey = `exercise-completed-${currentYear}-${currentMonth}`

    Object.keys(localStorage).forEach((key) => {
      if (
        (key.startsWith("exercise-schedule-") && key !== scheduleKey) ||
        (key.startsWith("exercise-completed-") && key !== completedKey)
      ) {
        localStorage.removeItem(key)
      }
    })

    const savedSchedule = localStorage.getItem(scheduleKey)
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule))
    }

    const savedCompleted = localStorage.getItem(completedKey)
    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted))
    }

    const streakData = localStorage.getItem("exercise-streak")
    if (streakData) {
      const { count, lastDate } = JSON.parse(streakData)
      const lastWorkoutDate = new Date(lastDate)
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)

      if (lastWorkoutDate.toDateString() !== today.toDateString() && lastWorkoutDate.toDateString() !== yesterday.toDateString()) {
        setStreak(0)
      } else {
        setStreak(count)
      }
    }
  }, [])

  useEffect(() => {
    if (
      Object.keys(schedule).length === 0 &&
      !localStorage.getItem(`exercise-schedule-${new Date().getFullYear()}-${new Date().getMonth()}`)
    )
      return
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const storageKey = `exercise-schedule-${currentYear}-${currentMonth}`
    localStorage.setItem(storageKey, JSON.stringify(schedule))
  }, [schedule])

  useEffect(() => {
    if (
      Object.keys(completed).length === 0 &&
      !localStorage.getItem(`exercise-completed-${new Date().getFullYear()}-${new Date().getMonth()}`)
    )
      return
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const storageKey = `exercise-completed-${currentYear}-${currentMonth}`
    localStorage.setItem(storageKey, JSON.stringify(completed))
  }, [completed])

  const addWorkout = (date: Date, timeSlot: "morning" | "evening", workout: WorkoutPlan) => {
    const dateKey = date.toDateString()
    setSchedule((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [timeSlot]: workout,
      },
    }))
  }

  const removeWorkout = (date: Date, timeSlot: "morning" | "evening") => {
    const dateKey = date.toDateString()
    setSchedule((prev) => {
      const updated = { ...prev }
      if (updated[dateKey]) {
        delete updated[dateKey][timeSlot]
        if (!updated[dateKey].morning && !updated[dateKey].evening) {
          delete updated[dateKey]
        }
      }
      return updated
    })
  }

  const startWorkout = (plan: WorkoutPlan, date: Date, timeSlot: "morning" | "evening") => {
    setPlannedWorkout({ plan, date, timeSlot })
    setShowTimePlanner(true)
  }

  const handleTimePlan = (exerciseTime: number, restTime: number) => {
    if (plannedWorkout) {
      setUserExerciseTime(exerciseTime)
      setUserRestTime(restTime)
      setActiveWorkout(plannedWorkout)
      setShowTimePlanner(false)
      setPlannedWorkout(null)
    }
  }

  const cancelTimePlan = () => {
    setShowTimePlanner(false)
    setPlannedWorkout(null)
  }

  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case "cardio":
        return "bg-red-100 text-red-800 border-red-200"
      case "strength":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "hiit":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "flexibility":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case "Low":
        return <Target className="h-4 w-4" />
      case "Medium":
        return <Zap className="h-4 w-4" />
      case "High":
        return <Flame className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const selectedDateKey = selectedDate?.toDateString()
  const daySchedule = selectedDateKey ? schedule[selectedDateKey] : undefined

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Time Planner Modal */}
      {showTimePlanner && plannedWorkout && (
        <TimePlanner
          workout={plannedWorkout.plan}
          onPlan={handleTimePlan}
          onCancel={cancelTimePlan}
        />
      )}

      {/* Workout Execution Modal */}
      {activeWorkout && (
        <WorkoutExecution
          workout={activeWorkout.plan}
          onClose={(completed) => {
            if (completed) {
              const dateKey = activeWorkout.date.toDateString()
              setCompleted((prev) => ({
                ...prev,
                [dateKey]: {
                  ...prev[dateKey],
                  [activeWorkout.timeSlot]: true,
                },
              }))

              // Update streak
              const today = new Date()
              const yesterday = new Date()
              yesterday.setDate(today.getDate() - 1)

              setStreak((prev) => {
                const newStreak = prev + 1
                localStorage.setItem(
                  "exercise-streak",
                  JSON.stringify({ count: newStreak, lastDate: today.toDateString() })
                )
                return newStreak
              })
            }
            setActiveWorkout(null)
          }}
          exerciseTime={userExerciseTime}
          restTime={userRestTime}
        />
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Start Your Transformation Today!</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Indoor workouts designed for weight loss and staying active
          </p>
          <div className="text-2xl font-semibold">
            🔥 Your current streak: {streak} day{streak !== 1 && "s"}!
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Calendar and Schedule Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Monthly Schedule
              </CardTitle>
              <CardDescription>Select a date to plan your morning and evening workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  morning: (date) => {
                    const dateKey = date.toDateString()
                    return !!completed[dateKey]?.morning && !completed[dateKey]?.evening
                  },
                  evening: (date) => {
                    const dateKey = date.toDateString()
                    return !!completed[dateKey]?.evening && !completed[dateKey]?.morning
                  },
                  both: (date) => {
                    const dateKey = date.toDateString()
                    return !!completed[dateKey]?.morning && !!completed[dateKey]?.evening
                  },
                }}
                modifiersStyles={{
                  morning: { backgroundColor: "#fde047", color: "black" },
                  evening: { backgroundColor: "#818cf8", color: "white" },
                  both: {
                    background: "linear-gradient(to right, #fde047 50%, #818cf8 50%)",
                    color: "black",
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Daily Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select a Date"}
              </CardTitle>
              <CardDescription>Plan your morning and evening workout sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Morning Slot */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">🌅 Morning Session</h3>
                {daySchedule?.morning ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{daySchedule.morning.name}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() =>
                            selectedDate && daySchedule.morning && startWorkout(daySchedule.morning, selectedDate, "morning")
                          }
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Start Exercise
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => selectedDate && removeWorkout(selectedDate, "morning")}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {daySchedule.morning.duration} min
                      {getIntensityIcon(daySchedule.morning.intensity)}
                      {daySchedule.morning.intensity}
                    </div>
                    <Badge className={getWorkoutTypeColor(daySchedule.morning.type)}>{daySchedule.morning.type}</Badge>
                    <div className="flex gap-2 mt-2">
                      {daySchedule.morning.exercises.slice(0, 3).map((exercise) => (
                        <img
                          key={exercise}
                          src={exerciseImages[exercise] || "/placeholder.svg"}
                          alt={exercise}
                          className="w-8 h-8 rounded object-cover border"
                          title={exercise}
                        />
                      ))}
                      {daySchedule.morning.exercises.length > 3 && (
                        <div className="w-8 h-8 rounded border bg-muted flex items-center justify-center text-xs">
                          +{daySchedule.morning.exercises.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No workout scheduled</p>
                )}
              </div>

              {/* Evening Slot */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">🌙 Evening Session</h3>
                {daySchedule?.evening ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{daySchedule.evening.name}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() =>
                            selectedDate && daySchedule.evening && startWorkout(daySchedule.evening, selectedDate, "evening")
                          }
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Start Exercise
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => selectedDate && removeWorkout(selectedDate, "evening")}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {daySchedule.evening.duration} min
                      {getIntensityIcon(daySchedule.evening.intensity)}
                      {daySchedule.evening.intensity}
                    </div>
                    <Badge className={getWorkoutTypeColor(daySchedule.evening.type)}>{daySchedule.evening.type}</Badge>
                    <div className="flex gap-2 mt-2">
                      {daySchedule.evening.exercises.slice(0, 3).map((exercise) => (
                        <img
                          key={exercise}
                          src={exerciseImages[exercise] || "/placeholder.svg"}
                          alt={exercise}
                          className="w-8 h-8 rounded object-cover border"
                          title={exercise}
                        />
                      ))}
                      {daySchedule.evening.exercises.length > 3 && (
                        <div className="w-8 h-8 rounded border bg-muted flex items-center justify-center text-xs">
                          +{daySchedule.evening.exercises.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No workout scheduled</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workout Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Available Workout Plans</CardTitle>
            <CardDescription>Choose from our curated indoor workouts designed for weight loss</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="morning" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="morning">Morning Workouts</TabsTrigger>
                <TabsTrigger value="evening">Evening Workouts</TabsTrigger>
              </TabsList>

              <TabsContent value="morning" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {workoutPlans
                    .filter((plan) => plan.id.includes("morning"))
                    .map((plan) => (
                      <Card key={plan.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <Badge className={getWorkoutTypeColor(plan.type)}>{plan.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {plan.duration} min
                            </span>
                            <span className="flex items-center gap-1">
                              {getIntensityIcon(plan.intensity)}
                              {plan.intensity}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Exercises:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {plan.exercises.map((exercise) => (
                                <div key={exercise} className="flex items-center gap-2 p-2 border rounded-lg">
                                  <img
                                    src={exerciseImages[exercise] || "/placeholder.svg"}
                                    alt={exercise}
                                    className="w-10 h-10 rounded object-cover"
                                  />
                                  <span className="text-xs font-medium">{exercise}</span>
                                </div>
                              ))}
                            </div>
                            <Button
                              className="w-full mt-3"
                              onClick={() => selectedDate && addWorkout(selectedDate, "morning", plan)}
                              disabled={!selectedDate}
                            >
                              Schedule for Morning
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="evening" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {workoutPlans
                    .filter((plan) => plan.id.includes("evening"))
                    .map((plan) => (
                      <Card key={plan.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <Badge className={getWorkoutTypeColor(plan.type)}>{plan.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {plan.duration} min
                            </span>
                            <span className="flex items-center gap-1">
                              {getIntensityIcon(plan.intensity)}
                              {plan.intensity}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Exercises:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {plan.exercises.map((exercise) => (
                                <div key={exercise} className="flex items-center gap-2 p-2 border rounded-lg">
                                  <img
                                    src={exerciseImages[exercise] || "/placeholder.svg"}
                                    alt={exercise}
                                    className="w-10 h-10 rounded object-cover"
                                  />
                                  <span className="text-xs font-medium">{exercise}</span>
                                </div>
                              ))}
                            </div>
                            <Button
                              className="w-full mt-3"
                              onClick={() => selectedDate && addWorkout(selectedDate, "evening", plan)}
                              disabled={!selectedDate}
                            >
                              Schedule for Evening
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Motivational Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">💪 Stay Motivated!</h2>
            <p className="text-lg mb-4">
              "The journey of a thousand miles begins with one step. Start your transformation today!"
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15-30</div>
                <div className="text-sm text-muted-foreground">Minutes per session</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Equipment needed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Indoor friendly</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
