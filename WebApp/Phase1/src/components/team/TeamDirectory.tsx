import React, { useState } from 'react';
import { Search, Filter, UserPlus, MoreVertical, Mail, Phone, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RoleIndicator } from '../ui/RoleIndicator';
import { FeatureGate } from '../ui/FeatureGate';
import { UserRole } from '../../types';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    email: 'sarah@acme.com',
    phone: '+1 (555) 234-5678',
    role: 'teamAdmin',
    department: 'Operations',
    joinedAt: '2024-01-15',
    lastActive: '2024-07-01T09:30:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike@acme.com',
    role: 'regularUser',
    department: 'Sales',
    joinedAt: '2024-02-20',
    lastActive: '2024-07-01T08:15:00Z',
    status: 'active',
  },
  {
    id: '3',
    name: 'Lisa Chen',
    email: 'lisa@acme.com',
    role: 'regularUser',
    department: 'Marketing',
    joinedAt: '2024-03-10',
    lastActive: '2024-06-30T16:45:00Z',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@acme.com',
    role: 'regularUser',
    department: 'Engineering',
    joinedAt: '2024-06-01',
    lastActive: '2024-07-01T10:00:00Z',
    status: 'pending',
  },
];

export const TeamDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastActive = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Directory</h1>
          <p className="mt-1 text-gray-600">
            Manage your team members and their roles.
          </p>
        </div>
        
        <FeatureGate permission="user_invite">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </FeatureGate>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="regularUser">Regular User</option>
            <option value="teamAdmin">Team Admin</option>
            <option value="superAdmin">Super Admin</option>
          </select>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
          </select>
          
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Team Members List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RoleIndicator role={member.role} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.department || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatLastActive(member.lastActive)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      {member.phone && (
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      )}
                      <FeatureGate permission="team_management">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </FeatureGate>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <UserPlus className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-600">
              {searchTerm || filterRole !== 'all' || filterDepartment !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Start by inviting your first team member.'
              }
            </p>
          </div>
        )}
      </Card>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{mockTeamMembers.length}</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
        </Card>
        
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockTeamMembers.filter(m => m.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </Card>
        
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {mockTeamMembers.filter(m => m.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </Card>
        
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {new Set(mockTeamMembers.map(m => m.department).filter(Boolean)).size}
            </div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
        </Card>
      </div>
    </div>
  );
};