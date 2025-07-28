
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Target, TrendingUp, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  startDate: string;
  dueDate: string;
  budget: number;
  spent: number;
  teamSize: number;
  category: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
}

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'تطوير منصة التجارة الإلكترونية',
      description: 'إنشاء منصة شاملة للتجارة الإلكترونية مع نظام إدارة المخزون',
      status: 'active',
      priority: 'high',
      progress: 65,
      startDate: '2024-01-15',
      dueDate: '2024-04-30',
      budget: 50000,
      spent: 32500,
      teamSize: 8,
      category: 'تطوير البرمجيات',
      tasks: [
        {
          id: '1-1',
          title: 'تصميم واجهة المستخدم',
          description: 'تصميم واجهات المستخدم الرئيسية للمنصة',
          status: 'completed',
          priority: 'high',
          assignee: 'أحمد محمد',
          dueDate: '2024-02-15',
          estimatedHours: 40,
          actualHours: 42,
          tags: ['UI/UX', 'تصميم']
        },
        {
          id: '1-2',
          title: 'تطوير نظام الدفع',
          description: 'تطوير وتكامل نظام الدفع الآمن',
          status: 'in_progress',
          priority: 'high',
          assignee: 'سارة أحمد',
          dueDate: '2024-03-15',
          estimatedHours: 60,
          actualHours: 35,
          tags: ['Backend', 'أمان']
        }
      ]
    },
    {
      id: '2',
      name: 'حملة تسويق رقمي',
      description: 'حملة تسويقية شاملة عبر وسائل التواصل الاجتماعي',
      status: 'planning',
      priority: 'medium',
      progress: 20,
      startDate: '2024-03-01',
      dueDate: '2024-06-30',
      budget: 25000,
      spent: 5000,
      teamSize: 5,
      category: 'تسويق',
      tasks: []
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    assignee: '',
    dueDate: '',
    estimatedHours: 0
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'review': return <AlertCircle className="w-4 h-4 text-purple-600" />;
      default: return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddTask = () => {
    if (!selectedProject || !newTask.title) return;

    const task: Task = {
      id: `${selectedProject.id}-${selectedProject.tasks.length + 1}`,
      ...newTask,
      status: 'todo',
      actualHours: 0,
      tags: []
    };

    const updatedProject = {
      ...selectedProject,
      tasks: [...selectedProject.tasks, task]
    };

    setProjects(prev => prev.map(p => p.id === selectedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      estimatedHours: 0
    });
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    if (!selectedProject) return;

    const updatedProject = {
      ...selectedProject,
      tasks: selectedProject.tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    };

    setProjects(prev => prev.map(p => p.id === selectedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
  };

  return (
    <div className="space-y-6">
      {/* معلومات المشروع العامة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المشاريع</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المشاريع النشطة</p>
                <p className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الميزانية</p>
                <p className="text-2xl font-bold">
                  ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">أعضاء الفريق</p>
                <p className="text-2xl font-bold">
                  {projects.reduce((sum, p) => sum + p.teamSize, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة المشاريع */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>المشاريع</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProject?.id === project.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm">{project.name}</h3>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status === 'active' ? 'نشط' :
                     project.status === 'completed' ? 'مكتمل' :
                     project.status === 'planning' ? 'تخطيط' : 'متوقف'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>التقدم</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project.teamSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.dueDate).toLocaleDateString('ar')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* تفاصيل المشروع */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedProject ? selectedProject.name : 'اختر مشروعاً'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedProject ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="tasks">المهام</TabsTrigger>
                  <TabsTrigger value="analytics">التحليلات</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>الوصف</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedProject.description}
                      </p>
                    </div>
                    <div>
                      <Label>الفئة</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedProject.category}
                      </p>
                    </div>
                    <div>
                      <Label>تاريخ البداية</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(selectedProject.startDate).toLocaleDateString('ar')}
                      </p>
                    </div>
                    <div>
                      <Label>تاريخ الانتهاء</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(selectedProject.dueDate).toLocaleDateString('ar')}
                      </p>
                    </div>
                    <div>
                      <Label>الميزانية</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        ${selectedProject.budget.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label>المصروف</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        ${selectedProject.spent.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>التقدم العام</Label>
                      <span className="text-sm font-medium">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tasks" className="space-y-4">
                  {/* إضافة مهمة جديدة */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">إضافة مهمة جديدة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="task-title">عنوان المهمة</Label>
                          <Input
                            id="task-title"
                            value={newTask.title}
                            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="أدخل عنوان المهمة"
                          />
                        </div>
                        <div>
                          <Label htmlFor="task-assignee">المكلف</Label>
                          <Input
                            id="task-assignee"
                            value={newTask.assignee}
                            onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                            placeholder="اسم المكلف"
                          />
                        </div>
                        <div>
                          <Label htmlFor="task-priority">الأولوية</Label>
                          <Select value={newTask.priority} onValueChange={(value: any) => setNewTask(prev => ({ ...prev, priority: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">منخفضة</SelectItem>
                              <SelectItem value="medium">متوسطة</SelectItem>
                              <SelectItem value="high">عالية</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="task-hours">الساعات المقدرة</Label>
                          <Input
                            id="task-hours"
                            type="number"
                            value={newTask.estimatedHours}
                            onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 0 }))}
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="task-description">الوصف</Label>
                        <Input
                          id="task-description"
                          value={newTask.description}
                          onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="وصف المهمة"
                        />
                      </div>
                      <div>
                        <Label htmlFor="task-due">تاريخ الانتهاء</Label>
                        <Input
                          id="task-due"
                          type="date"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                        />
                      </div>
                      <Button onClick={handleAddTask} className="w-full">
                        إضافة المهمة
                      </Button>
                    </CardContent>
                  </Card>

                  {/* قائمة المهام */}
                  <div className="space-y-3">
                    {selectedProject.tasks.map((task) => (
                      <Card key={task.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              {getStatusIcon(task.status)}
                              <div>
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-sm text-gray-600">{task.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority === 'high' ? 'عالية' :
                                 task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                              </Badge>
                              <Select
                                value={task.status}
                                onValueChange={(value: any) => updateTaskStatus(task.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="todo">قيد الانتظار</SelectItem>
                                  <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                                  <SelectItem value="review">مراجعة</SelectItem>
                                  <SelectItem value="completed">مكتملة</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>المكلف: {task.assignee}</span>
                            <span>الموعد: {new Date(task.dueDate).toLocaleDateString('ar')}</span>
                            <span>الوقت: {task.actualHours}/{task.estimatedHours} ساعة</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">توزيع المهام</h4>
                        <div className="space-y-2">
                          {['todo', 'in_progress', 'review', 'completed'].map(status => {
                            const count = selectedProject.tasks.filter(t => t.status === status).length;
                            const percentage = selectedProject.tasks.length > 0 
                              ? (count / selectedProject.tasks.length) * 100 
                              : 0;
                            
                            return (
                              <div key={status} className="flex items-center justify-between">
                                <span className="text-sm">
                                  {status === 'todo' ? 'قيد الانتظار' :
                                   status === 'in_progress' ? 'قيد التنفيذ' :
                                   status === 'review' ? 'مراجعة' : 'مكتملة'}
                                </span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm w-8">{count}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">الميزانية</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>الميزانية الإجمالية</span>
                            <span>${selectedProject.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>المصروف</span>
                            <span>${selectedProject.spent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium">
                            <span>المتبقي</span>
                            <span>${(selectedProject.budget - selectedProject.spent).toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(selectedProject.spent / selectedProject.budget) * 100}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8 text-gray-500">
                اختر مشروعاً من القائمة الجانبية لعرض التفاصيل
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectManagement;
