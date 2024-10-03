'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/context/UserContext';
import { supabaseClient } from '@/utils/supabase/client';
import { Building2, GraduationCap, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const supabase = supabaseClient();

const DepartmentCoordinatorDashboardPage = () => {
  const { user } = useUser();
  const [counts, setCounts] = useState({
    collegeMentors: 0,
    students: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: mentorCount, error: mentorError } = await supabase
        .from('college_mentors')
        .select('uid', { count: 'exact' })
        .eq('institute_id', user?.user_metadata.institute_id);
      if (mentorError) console.error(mentorError);

      const { count: studentCount, error: studentError } = await supabase
        .from('students')
        .select('uid', { count: 'exact' })
        .eq('institute_id', user?.user_metadata.institute_id);
      if (studentError) console.error(studentError);

      setCounts({
        collegeMentors: mentorCount || 0,
        students: studentCount || 0,
      });
    };

    user && fetchCounts();
  }, [user]);

  const data = [
    {
      name: 'Registered College Mentors',
      total: counts.collegeMentors,
      icon: GraduationCap,
    },
    {
      name: 'Total Students',
      total: counts.students,
      icon: Users,
    },
  ];

  return (
    <div className="@container">
      <div className="pb-5">
        <h1 className="text-2xl font-semibold flex">
          <span>Hello,&nbsp;</span>
          <span>
            {user ? user.user_metadata.name : <Skeleton className="h-8 w-40" />}
          </span>
          <span>&nbsp;👋</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 py-2">
          Welcome to your department dashboard.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <Card
            key={index}
            className="text-center grid min-[700px]::grid-rows-[70%_30%]"
          >
            <CardHeader className="flex flex-col items-center space-y-3">
              <item.icon className="h-8 w-8 text-primary" />
              <CardTitle className="text-lg font-medium">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {item.total ? (
                  <CountUp end={item.total} duration={2.5} />
                ) : (
                  <Skeleton className="h-10 w-16 mx-auto" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCoordinatorDashboardPage;
