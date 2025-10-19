export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'editor' | 'viewer'
          full_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          role?: 'admin' | 'editor' | 'viewer'
          full_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'editor' | 'viewer'
          full_name?: string | null
          created_at?: string
        }
      }
      sliders: {
        Row: {
          id: number
          title: string
          subtitle: string | null
          button_text: string | null
          button_url: string | null
          image_url: string | null
          image_path: string | null
          sort_order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          subtitle?: string | null
          button_text?: string | null
          button_url?: string | null
          image_url?: string | null
          image_path?: string | null
          sort_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          subtitle?: string | null
          button_text?: string | null
          button_url?: string | null
          image_url?: string | null
          image_path?: string | null
          sort_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      models: {
        Row: {
          id: number
          brand: string | null
          name: string
          slug: string
          short_description: string | null
          description: string | null
          price: number | null
          currency: string
          status: string | null
          engine_cc: number | null
          power_hp: number | null
          color_options: string[] | null
          hero_image_url: string | null
          hero_image_path: string | null
          published: boolean
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: number
          brand?: string | null
          name: string
          slug: string
          short_description?: string | null
          description?: string | null
          price?: number | null
          currency?: string
          status?: string | null
          engine_cc?: number | null
          power_hp?: number | null
          color_options?: string[] | null
          hero_image_url?: string | null
          hero_image_path?: string | null
          published?: boolean
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: number
          brand?: string | null
          name?: string
          slug?: string
          short_description?: string | null
          description?: string | null
          price?: number | null
          currency?: string
          status?: string | null
          engine_cc?: number | null
          power_hp?: number | null
          color_options?: string[] | null
          hero_image_url?: string | null
          hero_image_path?: string | null
          published?: boolean
          updated_at?: string
          created_at?: string
        }
      }
      model_images: {
        Row: {
          id: number
          model_id: number
          image_url: string | null
          image_path: string | null
          sort_order: number
        }
        Insert: {
          id?: number
          model_id: number
          image_url?: string | null
          image_path?: string | null
          sort_order?: number
        }
        Update: {
          id?: number
          model_id?: number
          image_url?: string | null
          image_path?: string | null
          sort_order?: number
        }
      }
      faqs: {
        Row: {
          id: number
          question: string
          answer: string
          sort_order: number
          published: boolean
          updated_at: string
        }
        Insert: {
          id?: number
          question: string
          answer: string
          sort_order?: number
          published?: boolean
          updated_at?: string
        }
        Update: {
          id?: number
          question?: string
          answer?: string
          sort_order?: number
          published?: boolean
          updated_at?: string
        }
      }
      prefooter_banners: {
        Row: {
          id: number
          title: string
          description: string | null
          button_text: string | null
          button_url: string | null
          image_url: string | null
          image_path: string | null
          published: boolean
          sort_order: number
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          button_text?: string | null
          button_url?: string | null
          image_url?: string | null
          image_path?: string | null
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          button_text?: string | null
          button_url?: string | null
          image_url?: string | null
          image_path?: string | null
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: number
          phone: string | null
          email: string | null
          address: string | null
          google_maps_iframe: string | null
          working_hours: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          phone?: string | null
          email?: string | null
          address?: string | null
          google_maps_iframe?: string | null
          working_hours?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          phone?: string | null
          email?: string | null
          address?: string | null
          google_maps_iframe?: string | null
          working_hours?: string | null
          updated_at?: string
        }
      }
      footer_links: {
        Row: {
          id: number
          group_title: string
          label: string
          url: string
          sort_order: number
          published: boolean
        }
        Insert: {
          id?: number
          group_title: string
          label: string
          url: string
          sort_order?: number
          published?: boolean
        }
        Update: {
          id?: number
          group_title?: string
          label?: string
          url?: string
          sort_order?: number
          published?: boolean
        }
      }
      site_settings: {
        Row: {
          id: number
          site_name: string | null
          logo_url: string | null
          logo_path: string | null
          social_instagram: string | null
          social_facebook: string | null
          social_twitter: string | null
          last_updated: string
        }
        Insert: {
          id?: number
          site_name?: string | null
          logo_url?: string | null
          logo_path?: string | null
          social_instagram?: string | null
          social_facebook?: string | null
          social_twitter?: string | null
          last_updated?: string
        }
        Update: {
          id?: number
          site_name?: string | null
          logo_url?: string | null
          logo_path?: string | null
          social_instagram?: string | null
          social_facebook?: string | null
          social_twitter?: string | null
          last_updated?: string
        }
      }
      test_drive_requests: {
        Row: {
          id: number
          full_name: string
          phone: string
          model_id: number | null
          preferred_date: string | null
          note: string | null
          created_at: string
          processed: boolean
        }
        Insert: {
          id?: number
          full_name: string
          phone: string
          model_id?: number | null
          preferred_date?: string | null
          note?: string | null
          created_at?: string
          processed?: boolean
        }
        Update: {
          id?: number
          full_name?: string
          phone?: string
          model_id?: number | null
          preferred_date?: string | null
          note?: string | null
          created_at?: string
          processed?: boolean
        }
      }
      credit_applications: {
        Row: {
          id: number
          full_name: string
          phone: string
          income_range: string | null
          model_id: number | null
          created_at: string
          processed: boolean
        }
        Insert: {
          id?: number
          full_name: string
          phone: string
          income_range?: string | null
          model_id?: number | null
          created_at?: string
          processed?: boolean
        }
        Update: {
          id?: number
          full_name?: string
          phone?: string
          income_range?: string | null
          model_id?: number | null
          created_at?: string
          processed?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'editor' | 'viewer'
    }
  }
}


