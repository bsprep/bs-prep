const fs = require('fs');
let code = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

const regex = /const fetchUserData = async \(\) => \{[\s\S]*?fetchUserData\(\)\s*\}, \[\]\)/;

const replacement = `const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Student")
          setUserEmail(user.email || "")
          const av = user.user_metadata?.avatar_url || user.user_metadata?.picture || null
          setUserAvatar(av)
          
          // Get enrolled courses with details
          const { data: enrollments } = await supabase
            .from('enrollments')
            .select('course_id')
            .eq('user_id', user.id)
          
          if (enrollments && enrollments.length > 0) {
            const courseIds = enrollments.map(e => e.course_id)
            const { data: dbCourses } = await supabase
              .from('courses')
              .select('*')
              .in('id', courseIds)
            
            // Map course details, fallback to static if DB is missing
            const courses = courseIds.map(id => {
              const dbCourse = dbCourses?.find(c => c.id === id);
              const staticCourse = staticCourses.find(c => c.id === id);
              
              if (!staticCourse && dbCourse) return dbCourse;
              if (!dbCourse && staticCourse) return staticCourse;
              
              return { ...dbCourse, ...staticCourse };
            }).filter(Boolean)

            setEnrolledCourses(courses)
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])`;

if(regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('app/dashboard/page.tsx', code);
    console.log('Fixed fetchUserData');
} else {
    console.log('Regex did not match');
}
