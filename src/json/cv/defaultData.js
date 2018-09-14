import Parts from './parts';
import CVHelper from '../../helper/cv.helper';
import Constant from '../../config/constant';

export default {
  template: 'defaultTemplate',
  passDatas: {
    primaryColor: Constant.cv.primaryColor
  },
  pages: [
    {
      id: CVHelper.guid(),
      parts: [
        Parts.PersonalDetail,
        Parts.Education,
        Parts.OtherSkill,
        Parts.WorkingExperience,
        Parts.OrganizationalExperience
      ]
    }
  ]
};
