import CVHelper from '../../helper/cv.helper';

export default {
  PersonalDetail: {
    id: CVHelper.guid(),
    name: 'Personal Information',
    type: 'PersonalDetail',
    display: false,
    height: 0,
    icon: 'faUser',
    datas: {
      heading: CVHelper.convertValue('Personal Details'),
      avatar: {
        display: true,
        size: 'normal'
      },
      rowsData: [
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Name'),
          value: CVHelper.convertValue('Kalifa')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Place and Date of Birth'),
          value: CVHelper.convertValue('12-04-1973')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Sex'),
          value: CVHelper.convertValue('Male')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Address'),
          value: CVHelper.convertValue('Toxa, Texas, US')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Marital Status'),
          value: CVHelper.convertValue('Married')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Telephone Number'),
          value: CVHelper.convertValue('01040094848474')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Email'),
          value: CVHelper.convertValue('kalifa@gmail.com')
        }
      ]
    }
  },
  Education: {
    id: CVHelper.guid(),
    name: 'Education',
    type: 'Education',
    display: true,
    height: 0,
    icon: 'faUserGraduate',
    datas: {
      heading: CVHelper.convertValue('Education'),
      rowsData: [
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('January 2018'),
          value: CVHelper.convertValue(
            'Bachelor Degree of Economic at Univercitas SebeleasMaret'
          )
        },
        {
          id: CVHelper.guid(),
          isSub: true,
          label: CVHelper.convertValue('Marjor'),
          value: CVHelper.convertValue('Management')
        },
        {
          id: CVHelper.guid(),
          isSub: true,
          label: CVHelper.convertValue('GPA'),
          value: CVHelper.convertValue('3.19')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2007'),
          value: CVHelper.convertValue(
            'Finished Senior Highschool (SMA N 7 Surakarta)'
          )
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2004'),
          value: CVHelper.convertValue(
            'Finished Junior Highschool (SMA N 9 Surakarta)'
          )
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2001'),
          value: CVHelper.convertValue(
            "Finished Primary Highschool (SD Ta'miru Islam Surakarta)"
          )
        }
      ]
    }
  },
  OtherSkill: {
    id: CVHelper.guid(),
    name: 'Skill',
    type: 'OtherSkill',
    display: true,
    height: 0,
    icon: 'faCogs',
    datas: {
      heading: CVHelper.convertValue('Other Skill'),
      rowsData: [
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Microsoft Office'),
          value: CVHelper.convertValue('')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Internet Literacy'),
          value: CVHelper.convertValue('')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Photoshop'),
          value: CVHelper.convertValue('')
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('Active English with TOEFL ITP Score'),
          value: CVHelper.convertValue('69')
        }
      ]
    }
  },
  WorkingExperience: {
    id: CVHelper.guid(),
    name: 'Experience',
    type: 'WorkingExperience',
    display: true,
    height: 0,
    icon: 'faBriefcase',
    datas: {
      heading: CVHelper.convertValue('Working Experience'),
      rowsData: [
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2012 - Present'),
          value: CVHelper.convertValue(
            'Ruby on Rails Developer - Programme outsourcing projects, create coding frames and design database based on project descriptions'
          )
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2014 - 2018'),
          value: CVHelper.convertValue(
            'Website Developer - Develop web module on given projects.'
          )
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2010 - 2014'),
          value: CVHelper.convertValue('Freelance at Rp.7 Comunication')
        }
      ]
    }
  },
  OrganizationalExperience: {
    id: CVHelper.guid(),
    name: 'Organizational experience',
    type: 'WorkingExperience',
    display: false,
    height: 0,
    datas: {
      heading: CVHelper.convertValue('Organizational Experience'),
      rowsData: [
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2012 - Present'),
          value: CVHelper.convertValue(
            'Ruby on Rails Developer - Programme outsourcing projects, create coding frames and design database based on project descriptions'
          )
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2014 - 2018'),
          value: CVHelper.convertValue(
            'Website Developer - Develop web module on given projects.'
          )
        },
        {
          id: CVHelper.guid(),
          label: CVHelper.convertValue('2008 - 2010'),
          value: CVHelper.convertValue(
            'Website Designer - Designer web layout on given projects.'
          )
        }
      ]
    }
  },
  Signature: {
    id: CVHelper.guid(),
    name: 'Signature',
    type: 'Signature',
    display: false,
    height: 80,
    datas: {
      display: true
    }
  }
};
