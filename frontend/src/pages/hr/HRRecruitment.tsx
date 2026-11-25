import { Plus, X, Users, Briefcase, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Candidate {
  id: number
  name: string
  position: string
  date: string
  stage: 'Applied' | 'Screening' | 'Interview' | 'Offer'
}

interface JobListing {
  id: number
  title: string
  department: string
  type: string
  applicants: number
  status: 'Open' | 'Closed' | 'Paused'
}

const initialCandidates: Candidate[] = [
  { id: 1, name: 'Olivia Brown', position: 'Frontend Engineer', date: 'Mar 28', stage: 'Applied' },
  { id: 2, name: 'Sophia Martinez', position: 'Data Analyst', date: 'Mar 27', stage: 'Applied' },
  { id: 3, name: 'Emma Thompson', position: 'HR Coordinator', date: 'Mar 25', stage: 'Applied' },
  { id: 4, name: 'Liam Carter', position: 'Product Designer', date: 'Mar 27', stage: 'Screening' },
  { id: 5, name: 'Ava Wilson', position: 'Backend Engineer', date: 'Mar 24', stage: 'Screening' },
  { id: 6, name: 'Mia Johnson', position: 'Data Scientist', date: 'Mar 22', stage: 'Screening' },
  {
    id: 7,
    name: 'Isabella Davis',
    position: 'Frontend Engineer',
    date: 'Mar 20',
    stage: 'Interview',
  },
  { id: 8, name: 'Lucas Garcia', position: 'DevOps Engineer', date: 'Mar 18', stage: 'Interview' },
  { id: 9, name: 'Ethan White', position: 'UX Designer', date: 'Mar 15', stage: 'Interview' },
  { id: 10, name: 'Noah Williams', position: 'Backend Engineer', date: 'Mar 26', stage: 'Offer' },
  { id: 11, name: 'Aiden Lee', position: 'Product Manager', date: 'Mar 23', stage: 'Offer' },
  { id: 12, name: 'Zoe Harris', position: 'ML Engineer', date: 'Mar 19', stage: 'Offer' },
]

const initialJobListings: JobListing[] = [
  {
    id: 1,
    title: 'Frontend Engineer',
    department: 'Engineering',
    type: 'Full-time',
    applicants: 14,
    status: 'Open',
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    type: 'Full-time',
    applicants: 9,
    status: 'Open',
  },
  {
    id: 3,
    title: 'Data Analyst',
    department: 'Analytics',
    type: 'Full-time',
    applicants: 7,
    status: 'Open',
  },
  {
    id: 4,
    title: 'HR Coordinator',
    department: 'HR',
    type: 'Part-time',
    applicants: 5,
    status: 'Open',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    department: 'Engineering',
    type: 'Contract',
    applicants: 3,
    status: 'Paused',
  },
]

const stages: Array<'Applied' | 'Screening' | 'Interview' | 'Offer'> = [
  'Applied',
  'Screening',
  'Interview',
  'Offer',
]

const stageColors: Record<string, string> = {
  Applied: '#6B7280',
  Screening: '#FFC107',
  Interview: '#12C4D3',
  Offer: '#00BF6B',
}

const jobStatusColors: Record<string, string> = {
  Open: 'bg-[#00BF6B]/20 text-[#00BF6B]',
  Closed: 'bg-[#EF4444]/20 text-[#EF4444]',
  Paused: 'bg-[#FFC107]/20 text-[#FFC107]',
}

interface JobForm {
  position: string
  department: string
  type: string
  description: string
}

export default function HRRecruitment() {
  const [candidates, setCandidates] = useState(initialCandidates)
  const [jobListings, setJobListings] = useState(initialJobListings)
  const [showModal, setShowModal] = useState(false)
  const [jobForm, setJobForm] = useState<JobForm>({
    position: '',
    department: '',
    type: 'Full-time',
    description: '',
  })

  const handlePostJob = () => {
    if (!jobForm.position.trim() || !jobForm.department.trim()) return
    setJobListings((prev) => [
      {
        id: Date.now(),
        title: jobForm.position,
        department: jobForm.department,
        type: jobForm.type,
        applicants: 0,
        status: 'Open',
      },
      ...prev,
    ])
    setJobForm({ position: '', department: '', type: 'Full-time', description: '' })
    setShowModal(false)
  }

  const moveCandidate = (id: number, direction: 'forward') => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const idx = stages.indexOf(c.stage)
        if (direction === 'forward' && idx < stages.length - 1) {
          return { ...c, stage: stages[idx + 1]! }
        }
        return c
      })
    )
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Recruitment</h1>
          <p className="text-[15px] text-[#9CA3AF]">Track candidates through the hiring pipeline</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#EC4899] text-white rounded-lg hover:bg-[#DB2777] transition-all duration-200 text-[15px] font-medium"
        >
          <Plus className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter((c) => c.stage === stage)
          return (
            <div
              key={stage}
              className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden"
            >
              <div className="p-4 border-b border-[#333333] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stageColors[stage] }}
                  />
                  <span className="text-[15px] font-semibold text-[#E0E0E0]">{stage}</span>
                </div>
                <span className="text-[13px] font-medium text-[#9CA3AF] bg-[#1F1F1F] px-2 py-0.5 rounded-full">
                  {stageCandidates.length}
                </span>
              </div>
              <div className="p-3 space-y-3">
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-[#1F1F1F] rounded-lg p-3 border border-[#333333] hover:border-[#444444] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#EC4899] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[11px] font-medium">
                          {candidate.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-[#E0E0E0] truncate">
                          {candidate.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#6B7280]" />
                      <p className="text-[13px] text-[#9CA3AF] truncate">{candidate.position}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#6B7280]">{candidate.date}</span>
                      {stage !== 'Offer' && (
                        <button
                          onClick={() => moveCandidate(candidate.id, 'forward')}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-[#EC4899]/15 text-[#EC4899] hover:bg-[#EC4899]/30 transition-colors text-[12px] font-medium"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                          Advance
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {stageCandidates.length === 0 && (
                  <div className="py-6 text-center text-[#6B7280] text-[13px]">No candidates</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Job Listings */}
      <div className="bg-[#121212] rounded-xl border border-[#333333]">
        <div className="p-6 border-b border-[#333333] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#EC4899]" />
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Open Positions</h2>
          </div>
          <span className="text-[14px] text-[#9CA3AF]">
            {jobListings.filter((j) => j.status === 'Open').length} active
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333333]">
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333]">
              {jobListings.map((job) => (
                <tr key={job.id} className="hover:bg-[#1F1F1F] transition-colors">
                  <td className="px-6 py-4 text-[15px] font-medium text-[#E0E0E0]">{job.title}</td>
                  <td className="px-6 py-4 text-[15px] text-[#9CA3AF]">{job.department}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[13px] font-medium bg-[#1F1F1F] text-[#9CA3AF] border border-[#333333]">
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[15px] text-[#E0E0E0]">{job.applicants}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[13px] font-medium ${jobStatusColors[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-[#333333] w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#333333]">
              <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Post New Job</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Position Title
                </label>
                <input
                  type="text"
                  value={jobForm.position}
                  onChange={(e) => setJobForm((f) => ({ ...f, position: e.target.value }))}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={jobForm.department}
                  onChange={(e) => setJobForm((f) => ({ ...f, department: e.target.value }))}
                  placeholder="e.g. Engineering"
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Employment Type
                </label>
                <select
                  value={jobForm.type}
                  onChange={(e) => setJobForm((f) => ({ ...f, type: e.target.value }))}
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={jobForm.description}
                  onChange={(e) => setJobForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the role, requirements, and responsibilities..."
                  className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-[#333333]">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#333333] text-[#9CA3AF] rounded-lg hover:bg-[#1F1F1F] transition-colors text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handlePostJob}
                disabled={!jobForm.position.trim() || !jobForm.department.trim()}
                className="flex-1 px-4 py-2.5 bg-[#EC4899] text-white rounded-lg hover:bg-[#DB2777] transition-all duration-200 text-[15px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
