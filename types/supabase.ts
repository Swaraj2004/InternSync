export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string | null
          date: string
          id: string
          status: string
          student_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          status: string
          student_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["uid"]
          },
        ]
      }
      college_mentors: {
        Row: {
          created_at: string
          department_id: string
          institute_id: number
          uid: string
        }
        Insert: {
          created_at?: string
          department_id: string
          institute_id: number
          uid: string
        }
        Update: {
          created_at?: string
          department_id?: string
          institute_id?: number
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "college_mentors_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "college_mentors_institute_id_fkey"
            columns: ["institute_id"]
            isOneToOne: false
            referencedRelation: "institutes"
            referencedColumns: ["institute_id"]
          },
          {
            foreignKeyName: "college_mentors_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      company_mentors: {
        Row: {
          company_address: string | null
          company_name: string | null
          created_at: string | null
          designation: string | null
          uid: string
        }
        Insert: {
          company_address?: string | null
          company_name?: string | null
          created_at?: string | null
          designation?: string | null
          uid: string
        }
        Update: {
          company_address?: string | null
          company_name?: string | null
          created_at?: string | null
          designation?: string | null
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_mentors_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          institute_id: number
          name: string
          uid: string
        }
        Insert: {
          created_at?: string
          institute_id: number
          name: string
          uid: string
        }
        Update: {
          created_at?: string
          institute_id?: number
          name?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_institute_id_fkey"
            columns: ["institute_id"]
            isOneToOne: false
            referencedRelation: "institutes"
            referencedColumns: ["institute_id"]
          },
          {
            foreignKeyName: "departments_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      institutes: {
        Row: {
          address: string | null
          created_at: string
          institute_email_domain: string | null
          institute_id: number
          name: string
          student_email_domain: string | null
          uid: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          institute_email_domain?: string | null
          institute_id: number
          name: string
          student_email_domain?: string | null
          uid: string
        }
        Update: {
          address?: string | null
          created_at?: string
          institute_email_domain?: string | null
          institute_id?: number
          name?: string
          student_email_domain?: string | null
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "institutes_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      internships: {
        Row: {
          approved: boolean
          college_mentor_id: string
          company_address: string
          company_mentor_email: string | null
          company_mentor_id: string | null
          company_name: string
          created_at: string
          end_date: string
          field: string
          id: string
          internship_letter_url: string
          mode: string
          role: string
          start_date: string
          student_id: string
          total_holidays: number | null
        }
        Insert: {
          approved?: boolean
          college_mentor_id: string
          company_address: string
          company_mentor_email?: string | null
          company_mentor_id?: string | null
          company_name: string
          created_at?: string
          end_date: string
          field: string
          id?: string
          internship_letter_url: string
          mode: string
          role: string
          start_date: string
          student_id: string
          total_holidays?: number | null
        }
        Update: {
          approved?: boolean
          college_mentor_id?: string
          company_address?: string
          company_mentor_email?: string | null
          company_mentor_id?: string | null
          company_name?: string
          created_at?: string
          end_date?: string
          field?: string
          id?: string
          internship_letter_url?: string
          mode?: string
          role?: string
          start_date?: string
          student_id?: string
          total_holidays?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "internships_college_mentor_id_fkey"
            columns: ["college_mentor_id"]
            isOneToOne: false
            referencedRelation: "college_mentors"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "internships_company_mentor_id_fkey"
            columns: ["company_mentor_id"]
            isOneToOne: false
            referencedRelation: "company_mentors"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "internships_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["uid"]
          },
        ]
      }
      notes: {
        Row: {
          description: string
          id: number
          title: string
          uid: string
        }
        Insert: {
          description: string
          id?: number
          title: string
          uid: string
        }
        Update: {
          description?: string
          id?: number
          title?: string
          uid?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          academic_year: number
          address: string | null
          admission_id: string | null
          admission_year: number | null
          college_mentor_id: string | null
          company_mentor_id: string | null
          created_at: string
          department_id: string
          division: string | null
          dob: string | null
          institute_id: number
          roll_no: number | null
          uid: string
        }
        Insert: {
          academic_year: number
          address?: string | null
          admission_id?: string | null
          admission_year?: number | null
          college_mentor_id?: string | null
          company_mentor_id?: string | null
          created_at?: string
          department_id: string
          division?: string | null
          dob?: string | null
          institute_id: number
          roll_no?: number | null
          uid: string
        }
        Update: {
          academic_year?: number
          address?: string | null
          admission_id?: string | null
          admission_year?: number | null
          college_mentor_id?: string | null
          company_mentor_id?: string | null
          created_at?: string
          department_id?: string
          division?: string | null
          dob?: string | null
          institute_id?: number
          roll_no?: number | null
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_college_mentor_id_fkey"
            columns: ["college_mentor_id"]
            isOneToOne: false
            referencedRelation: "college_mentors"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "students_company_mentor_id_fkey"
            columns: ["company_mentor_id"]
            isOneToOne: false
            referencedRelation: "company_mentors"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "students_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "students_institute_id_fkey"
            columns: ["institute_id"]
            isOneToOne: false
            referencedRelation: "institutes"
            referencedColumns: ["institute_id"]
          },
          {
            foreignKeyName: "students_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          role_id: string
          uid: string
        }
        Insert: {
          role_id: string
          uid: string
        }
        Update: {
          role_id?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          contact: number | null
          created_at: string
          email: string
          id: string
          is_registered: boolean
          is_verified: boolean
          name: string
        }
        Insert: {
          auth_id?: string | null
          contact?: number | null
          created_at?: string
          email: string
          id?: string
          is_registered?: boolean
          is_verified?: boolean
          name: string
        }
        Update: {
          auth_id?: string | null
          contact?: number | null
          created_at?: string
          email?: string
          id?: string
          is_registered?: boolean
          is_verified?: boolean
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_college_mentor: {
        Args: {
          mentor_name: string
          email: string
          institute_id: number
          department_id: string
          requesting_user_id: string
          contact?: number
          dob?: string
        }
        Returns: {
          user_id: string
          auth_id: string
          is_new_user: boolean
          has_role: boolean
          is_verified: boolean
        }[]
      }
      add_department_coordinator: {
        Args: {
          department_coordinator_name: string
          email: string
          department_name: string
          institute_id: number
          requesting_user_id: string
        }
        Returns: {
          user_id: string
          auth_id: string
          is_new_user: boolean
          has_role: boolean
          is_verified: boolean
        }[]
      }
      add_student: {
        Args: {
          student_name: string
          email: string
          institute_id: number
          department_id: string
          requesting_user_id: string
          academic_year: number
          college_mentor_id?: string
          contact?: number
          dob?: string
        }
        Returns: {
          user_id: string
          auth_id: string
          is_new_user: boolean
          has_role: boolean
          is_verified: boolean
        }[]
      }
      delete_college_mentor: {
        Args: {
          user_id: string
          institute_id: number
          requesting_user_id: string
          department_id?: string
        }
        Returns: Json
      }
      delete_department: {
        Args: {
          user_id: string
          institute_id: number
          requesting_user_id: string
        }
        Returns: Json
      }
      delete_student: {
        Args: {
          user_id: string
          institute_id: number
          requesting_user_id: string
          department_id?: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
