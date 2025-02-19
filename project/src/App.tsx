import React, { useState, useEffect } from 'react';
import { Youtube, Brain, Briefcase, CheckCircle2, Circle, Plus, Minus, Target, Code, Book, X, Pencil, Trophy } from 'lucide-react';
import { Goal, GoalState, NewGoalFormData, EditGoalFormData } from './types';

const INITIAL_GOALS: Goal[] = [
  {
    id: '1',
    name: 'Start YouTube Channel',
    target: 30,
    progress: 0,
    dailyProgress: {},
    videoCount: 0,
    icon: 'youtube'
  },
  {
    id: '2',
    name: 'Create ML Model',
    target: 30,
    progress: 0,
    dailyProgress: {},
    icon: 'brain'
  },
  {
    id: '3',
    name: 'Create Portfolio Website',
    target: 30,
    progress: 0,
    dailyProgress: {},
    icon: 'briefcase'
  },
];

const ICONS = {
  youtube: Youtube,
  brain: Brain,
  briefcase: Briefcase,
  target: Target,
  code: Code,
  book: Book,
};

function App() {
  const [goalState, setGoalState] = useState<GoalState>(() => {
    const saved = localStorage.getItem('goalState');
    return saved ? JSON.parse(saved) : { goals: INITIAL_GOALS };
  });
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<EditGoalFormData | null>(null);
  const [newGoal, setNewGoal] = useState<NewGoalFormData>({
    name: '',
    icon: 'target'
  });
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('goalState', JSON.stringify(goalState));
  }, [goalState]);

  const getGoalIcon = (icon: Goal['icon']) => {
    const IconComponent = icon ? ICONS[icon] : Target;
    return <IconComponent className="w-6 h-6" />;
  };

  const toggleDailyProgress = (goalId: string, date: string) => {
    setGoalState((prev) => {
      const updatedGoals = prev.goals.map((goal) => {
        if (goal.id === goalId) {
          const newDailyProgress = {
            ...goal.dailyProgress,
            [date]: !goal.dailyProgress[date],
          };
          
          const totalProgress = Object.values(newDailyProgress).filter(Boolean).length;
          
          return {
            ...goal,
            dailyProgress: newDailyProgress,
            progress: totalProgress,
          };
        }
        return goal;
      });
      
      return { ...prev, goals: updatedGoals };
    });
  };

  const incrementVideoCount = (goalId: string) => {
    setGoalState((prev) => {
      const updatedGoals = prev.goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            videoCount: Math.min((goal.videoCount || 0) + 1, 10),
          };
        }
        return goal;
      });
      return { ...prev, goals: updatedGoals };
    });
  };

  const decrementVideoCount = (goalId: string) => {
    setGoalState((prev) => {
      const updatedGoals = prev.goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            videoCount: Math.max((goal.videoCount || 0) - 1, 0),
          };
        }
        return goal;
      });
      return { ...prev, goals: updatedGoals };
    });
  };

  const getDaysInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const handleAddNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name.trim()) return;

    const newGoalItem: Goal = {
      id: crypto.randomUUID(),
      name: newGoal.name,
      target: 30,
      progress: 0,
      dailyProgress: {},
      icon: newGoal.icon,
    };

    setGoalState(prev => ({
      goals: [...prev.goals, newGoalItem]
    }));

    setNewGoal({ name: '', icon: 'target' });
    setShowNewGoalForm(false);
  };

  const handleEditGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal || !editingGoal.name.trim()) return;

    setGoalState(prev => ({
      goals: prev.goals.map(goal => 
        goal.id === editingGoal.id
          ? { ...goal, name: editingGoal.name, icon: editingGoal.icon }
          : goal
      )
    }));

    setEditingGoal(null);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoalState(prev => ({
      goals: prev.goals.filter(goal => goal.id !== goalId)
    }));
    setSelectedGoal(null);
  };

  const startEditingGoal = (goal: Goal) => {
    setEditingGoal({
      id: goal.id,
      name: goal.name,
      icon: goal.icon || 'target'
    });
  };

  const monthDays = getDaysInMonth();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">
              Goal Tracker
            </h1>
            <p className="text-indigo-600">Track your progress, achieve your dreams</p>
          </div>
          <button
            onClick={() => setShowNewGoalForm(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Goal
          </button>
        </div>

        {(showNewGoalForm || editingGoal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-indigo-900">
                  {editingGoal ? 'Edit Goal' : 'Add New Goal'}
                </h2>
                <button
                  onClick={() => editingGoal ? setEditingGoal(null) : setShowNewGoalForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={editingGoal ? handleEditGoal : handleAddNewGoal} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={editingGoal ? editingGoal.name : newGoal.name}
                    onChange={(e) => editingGoal 
                      ? setEditingGoal(prev => prev ? { ...prev, name: e.target.value } : prev)
                      : setNewGoal(prev => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter your goal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-6 gap-3">
                    {Object.entries(ICONS).map(([key, Icon]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => editingGoal
                          ? setEditingGoal(prev => prev ? { ...prev, icon: key as Goal['icon'] } : prev)
                          : setNewGoal(prev => ({ ...prev, icon: key as Goal['icon'] }))
                        }
                        className={`p-3 rounded-lg transition-all transform hover:scale-110 ${
                          (editingGoal ? editingGoal.icon : newGoal.icon) === key
                            ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-500'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => editingGoal ? setEditingGoal(null) : setShowNewGoalForm(false)}
                    className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
                  >
                    {editingGoal ? 'Save Changes' : 'Add Goal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goalState.goals.map((goal) => (
            <div
              key={goal.id}
              className={`bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl transform hover:-translate-y-1 cursor-pointer ${
                selectedGoal === goal.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedGoal(goal.id === selectedGoal ? null : goal.id)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                    {getGoalIcon(goal.icon)}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {goal.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingGoal(goal);
                    }}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50"
                    aria-label="Edit goal"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGoal(goal.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    aria-label="Delete goal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Daily Progress</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-indigo-600">
                      {goal.progress} / {goal.target} days
                    </span>
                    {goal.progress === goal.target && (
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all"
                    style={{
                      width: `${Math.min((goal.progress / goal.target) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {goal.id === '1' && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-900">Videos Uploaded</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          decrementVideoCount(goal.id);
                        }}
                        className="p-2 text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-100 rounded-lg transition-all"
                        disabled={goal.videoCount === 0}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-lg font-bold text-indigo-900 min-w-[60px] text-center">
                        {goal.videoCount} / 10
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementVideoCount(goal.id);
                        }}
                        className="p-2 text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-100 rounded-lg transition-all"
                        disabled={goal.videoCount === 10}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-indigo-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full transition-all"
                      style={{
                        width: `${Math.min((goal.videoCount || 0) / 10 * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className={`grid grid-cols-7 gap-2 transition-all ${
                selectedGoal === goal.id ? 'opacity-100' : 'opacity-70'
              }`}>
                {monthDays.map((date, index) => {
                  const isToday = date === today;
                  return (
                    <div
                      key={date}
                      className="flex flex-col items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDailyProgress(goal.id, date);
                      }}
                    >
                      <span className={`text-xs mb-1 ${
                        isToday ? 'text-indigo-600 font-bold' : 'text-gray-500'
                      }`}>
                        {index + 1}
                      </span>
                      <button 
                        className={`transition-all hover:scale-110 transform duration-200 ${
                          isToday ? 'ring-2 ring-indigo-300 rounded-full' : ''
                        }`}
                        aria-label={`Toggle progress for day ${index + 1}`}
                      >
                        {goal.dailyProgress[date] ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;