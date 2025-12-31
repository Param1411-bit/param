-- Create profile_settings table for admin editable content
CREATE TABLE public.profile_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read profile settings (public portfolio)
CREATE POLICY "Anyone can read profile settings"
ON public.profile_settings
FOR SELECT
USING (true);

-- Only authenticated admin can update
CREATE POLICY "Admin can update profile settings"
ON public.profile_settings
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Admin can insert profile settings"
ON public.profile_settings
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admin can delete profile settings"
ON public.profile_settings
FOR DELETE
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profile_settings_updated_at
BEFORE UPDATE ON public.profile_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-images', 'profile-images', true);

-- Storage policies
CREATE POLICY "Profile images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can update profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can delete profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');

-- Insert default profile data
INSERT INTO public.profile_settings (key, value) VALUES
('hero', '{"name": "Param", "title": "Data Analytics • Business Analysis • Data Science", "summary": "Aspiring data analyst with hands-on experience in business analytics, data visualization, and placement coordination. Skilled in Python, Excel, and data-driven decision making. Passionate about transforming raw data into actionable insights.", "email": "parambhatkar@gmail.com", "phone": "+91 8010217057", "github": "https://github.com/parambhatkar", "linkedin": "https://www.linkedin.com/in/parambhatkar"}'::jsonb),
('experiences', '[{"title": "Business Development Intern", "company": "ThePetNest", "period": "Nov 2024 – Jan 2025", "achievements": ["Analyzed market trends, customer needs, and competing platforms", "Managed leads, evaluated conversion funnels, and prepared weekly metrics", "Supported onboarding, communication, and CRM-like activities", "Prepared datasets, reports, and insights for strategy and decision-making"]}, {"title": "Full-Stack Developer", "company": "IEEE Bombay Section", "period": "Sept 2023 – Oct 2023", "achievements": ["Maintained structured documentation and technical records", "Collaborated with stakeholders to define project expectations", "Worked with diverse teams, improving communication and coordination"]}]'::jsonb),
('responsibilities', '[{"title": "Secretary – Training & Placement Cell", "period": "2024 – 2025", "description": "Managed the overall placement process at college, coordinated with 65+ companies, facilitated 457+ total offers, handled student records, recruiter communication, and event coordination."}, {"title": "Training & Placement Member", "period": "2023 – 2025", "description": "Supported placement activities, maintained student databases, coordinated campus recruitment drives, and assisted in company onboarding processes."}]'::jsonb),
('education', '[{"degree": "B.Tech – Electrical Engineering", "institution": "Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded", "period": "Nov 2022 – Present", "coursework": ["Data Science", "Python", "AI/ML Basics", "Probability & Statistics", "IoT", "MATLAB"]}, {"degree": "Senior Secondary (Electronics)", "institution": "Vidhya Bharti Mahavidyalaya, Amravati", "period": "2019 – 2021", "grade": "CGPA: 9.3"}, {"degree": "Secondary Education", "institution": "Smt. Sarla Ram Kakani Education Academy", "period": "2018 – 2019", "grade": "CGPA: 8.71"}]'::jsonb),
('projects', '[{"title": "Real-Time Toll Collection System", "period": "Oct 2024", "description": "Designed a real-time ANPR-based toll system that scans vehicle plates and deducts payments.", "achievements": ["System integration with a MySQL database", "Improved data accuracy and processing time by 40%"], "tags": ["Python", "OpenCV", "MySQL", "Flask"]}, {"title": "AI-Powered Resume Shortlisting Tool", "period": "Aug 2024", "description": "Built an NLP-based resume analysis tool that scores candidates based on job description matching.", "achievements": ["Reduced manual HR screening time by 60%", "Achieved 85% accuracy in skill-job matching"], "tags": ["Python", "NLP", "Scikit-learn", "Streamlit"]}, {"title": "HR Analytics Dashboard", "period": "Jul 2024", "description": "Developed an interactive Power BI dashboard for workforce attrition analysis.", "achievements": ["Identified key attrition drivers and trends", "Enabled data-driven HR decisions"], "tags": ["Power BI", "Excel", "Data Visualization"]}]'::jsonb),
('skills', '{"software": ["Microsoft Excel", "Power BI", "Tableau", "Python", "SQL", "MATLAB"], "hardware": ["Arduino", "Raspberry Pi", "IoT Sensors"], "domains": ["Data Analytics", "Business Analysis", "Machine Learning", "Data Visualization", "Statistical Analysis"], "programming": ["Python", "SQL", "JavaScript", "HTML/CSS"]}'::jsonb),
('contact', '{"email": "parambhatkar@gmail.com", "phone": "+91 8010217057", "github": "https://github.com/parambhatkar", "linkedin": "https://www.linkedin.com/in/parambhatkar", "location": "Nanded, Maharashtra, India"}'::jsonb);