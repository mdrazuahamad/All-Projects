import Layout from "../components/layout/Layout";
import Section from "../components/section/Section";

const experiance = [
  
  'Web Development',
  'Mobile App Development',
  'Desktop App Developmet',
  'Digital Martketing',
  'SEO',

]
const education = [
  
  'Web Development',
  'Mobile App Development',
  'Desktop App Developmet',
  'Digital Martketing',
  'SEO',

]
const marketing = [
  
  'Web Development',
  'Mobile App Development',
  'Desktop App Developmet',
  'Digital Martketing',
  'SEO',

]
const details = [
  
  'Web Development',
  'Mobile App Development',
  'Desktop App Developmet',
  'Digital Martketing',
  'SEO',

]

function Home() {
  return (
    <Layout>

      <Section title='Skills' items={experiance}/>
      <Section title='Educations' items={education}/>
      <Section title='Marketing' items={marketing}/>
      <Section title='About Me' items={details}/>

      

    </Layout>
  );
}

export default Home;
