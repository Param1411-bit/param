import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HeroData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface Responsibility {
  title: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  coursework?: string[];
  grade?: string;
}

export interface Project {
  title: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export interface Skills {
  software: string[];
  hardware: string[];
  domains: string[];
  programming: string[];
}

export interface ContactData {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
}

export function useProfileData<T>(key: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: result, error } = await supabase
          .from('profile_settings')
          .select('value')
          .eq('key', key)
          .maybeSingle();

        if (error) {
          console.error(`Error fetching ${key}:`, error);
        } else if (result) {
          setData(result.value as T);
        }
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [key]);

  return { data, loading, setData };
}

export async function updateProfileData(key: string, value: unknown) {
  const { error } = await supabase
    .from('profile_settings')
    .update({ value: value as any })
    .eq('key', key);

  if (error) {
    throw error;
  }
}

export async function getProfileImageUrl() {
  const { data } = await supabase
    .storage
    .from('profile-images')
    .getPublicUrl('profile.png');
  
  return data.publicUrl;
}

export async function uploadProfileImage(file: File) {
  const { data, error } = await supabase
    .storage
    .from('profile-images')
    .upload('profile.png', file, { upsert: true });

  if (error) {
    throw error;
  }

  return data;
}
