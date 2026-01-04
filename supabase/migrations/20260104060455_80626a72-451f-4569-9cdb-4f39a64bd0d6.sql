-- Fix profile_settings RLS policies: Replace weak policies with admin-only checks
-- Drop existing weak policies
DROP POLICY IF EXISTS "Admin can update profile settings" ON public.profile_settings;
DROP POLICY IF EXISTS "Admin can insert profile settings" ON public.profile_settings;
DROP POLICY IF EXISTS "Admin can delete profile settings" ON public.profile_settings;

-- Create admin-only policies checking email from JWT
CREATE POLICY "Only admin can update profile settings"
ON public.profile_settings
FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'email' = 'parambhatkar8@gmail.com');

CREATE POLICY "Only admin can insert profile settings"
ON public.profile_settings
FOR INSERT
TO authenticated
WITH CHECK (auth.jwt() ->> 'email' = 'parambhatkar8@gmail.com');

CREATE POLICY "Only admin can delete profile settings"
ON public.profile_settings
FOR DELETE
TO authenticated
USING (auth.jwt() ->> 'email' = 'parambhatkar8@gmail.com');

-- Fix storage policies: Replace policies allowing any authenticated user with admin-only
DROP POLICY IF EXISTS "Authenticated users can upload profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete profile images" ON storage.objects;

-- Add admin-only storage policies
CREATE POLICY "Admin can upload profile images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'profile-images' AND
  auth.jwt() ->> 'email' = 'parambhatkar8@gmail.com'
);

CREATE POLICY "Admin can update profile images"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'profile-images' AND
  auth.jwt() ->> 'email' = 'parambhatkar8@gmail.com'
);

CREATE POLICY "Admin can delete profile images"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'profile-images' AND
  auth.jwt() ->> 'email' = 'parambhatkar8@gmail.com'
);