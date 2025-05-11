import { observable, action } from 'mobx';
import BaseProvider from '@/utils/BaseProvider';
import { 
  initAttributes,
  initSkills, 
} from '../interfaces/character';
import { SkillFlag } from "@/interfaces/skill";
import { IMugenCharacter } from '@/interfaces/mugen';
import { Gender } from '@/interfaces/character';


const MALE_FIGURE = `https://dicetower-media.oss-cn-heyuan.aliyuncs.com/figure/asia-male.png`;

class CharacterStore {
  @observable loading = false;

  @observable figureChanged = false;
  @observable name = '';
  @observable appearance = '';
  @observable overview = '';
  @observable height = 175;
  @observable figureUrl = MALE_FIGURE;
  @observable gender = Gender.MALE;

  @observable skills = initSkills;
  @observable attributes = initAttributes;

  @action createCharacter = () => {
    if (this.loading) {
      return Promise.reject('正在创建人物中，请稍后重试')
    }
    this.loading = true;
    let data = {
      name: this.name,
      gender: this.gender,
      figure_url: this.figureUrl,
      height: this.height,
      appearance: this.appearance,
      overview: this.overview,
      attributes: this.attributes,
      skills: (Object.keys(this.skills) as Array<SkillFlag>).map((flag) => ({
        flag: flag,
        grade: this.skills[flag].grade,
        majors: this.skills[flag].majors,
      }))
    }
    return BaseProvider.post<IMugenCharacter>(`/api/character/`, data).finally(() => {
      this.loading = false;
    });
  }
}

const store = new CharacterStore();

export default store;
