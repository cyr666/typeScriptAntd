import React, {useState} from 'react';

import Button,{ButtonSize,ButtonType} from './components/Button/button'
import Alert,{AlertType} from './components/Alert/alert'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tab from './components/Tab/tab';
import TabPine from './components/Tab/tabpane';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import Input from './components/Input/input';

const App: React.FC = () => {
    const [show,setShow] = useState(false)
    const [value,setValue] = useState('')
    const handleChange = (e:any) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }
  return (
    <div>
        {/* <Icon icon="coffee" them='primary' size='10x'/> */}
      {/* <header>
        <Button buttonType={ButtonType.Primary} onClick={()=>{alert(123)}}>按钮</Button>
        <Button buttonType={ButtonType.Danger}>按钮</Button>
        <Button>default btn</Button>
        <Button disabled>Disabled Button</Button>
        <Button size={ButtonSize.Small}>Small Button</Button>
        <Button size={ButtonSize.Large} buttonType={ButtonType.Primary}>Large Button</Button>
        <Button href='http://www.baidu.com' buttonType={ButtonType.Link}>Link Button</Button>
        <Button href='http://www.baidu.com' buttonType={ButtonType.Link} disabled>disabled LinkBtn</Button>
      </header> */}
      <div>
        <Alert>这是一条info</Alert>
        <Alert title='标题' showIcon={true}>这是一条带有标题的info</Alert>
        <Alert title='标题' alertType={AlertType.Success}>这是一条带有标题的info</Alert>
        <Alert title='标题' alertType={AlertType.Warning}>这是一条带有标题的info</Alert>
        <Alert title='标题' alertType={AlertType.Error}>这是一条带有标题的info</Alert>
      </div>

      {/* <div>
        <Menu defaultIndex="0" onSelect={(index)=>{alert(index)}}>
            <SubMenu title='cookdown'>
                <MenuItem>jsjcjsjc</MenuItem>
                <MenuItem>jsjcjsjc</MenuItem>
                <MenuItem>jsjcjsjc</MenuItem>
            </SubMenu>
          <MenuItem disabled={true}>cookdown1</MenuItem>
          <MenuItem>cookdown2</MenuItem>
        </Menu>
      </div>

      <div>
        <Menu mode='vertical' defaultOpenKeys={['0']} onSelect={(index)=>{alert(index)}}>
            <SubMenu title='cookdown'>
                <MenuItem>jsjcjsjc</MenuItem>
                <MenuItem>jsjcjsjc</MenuItem>
                <MenuItem>jsjcjsjc</MenuItem>
            </SubMenu>
          <MenuItem disabled={true}>jsjcjsjc</MenuItem>
          <MenuItem>jsjcjsjc</MenuItem>
        </Menu>
      </div> */}

      {/* <div>
        <Tab>
            <TabPine tab="tab1">this is content1</TabPine>
            <TabPine tab="tab2">this is content2</TabPine>
            <TabPine tab="tab3">this is content3</TabPine>
        </Tab>
      </div> */}

      <Button buttonType="default" onClick={()=>{setShow(!show)}}>toogal</Button>
      {/* <Transition
        in = {show}
        timeout = {300}
        animation = "zoom-in-left"
      >
          <div>
            <p>this is content1</p>
            <p>this is content1</p>
            <p>this is content1</p>
            <p>this is content1</p>
            <p>this is content1</p>
          </div>
      </Transition>
      <Transition
        in = {show}
        timeout = {300}
        animation = "zoom-in-left"
        wrapper={true}
      >
          <Button buttonType="default">toogal</Button>
      </Transition> */}

        {/* <Alert title='标题' showIcon={true}>这是一条带有标题的info</Alert>
        <Alert title='标题' showIcon={true} alertType='error'>这是一条带有标题的info</Alert>
        <Alert title='标题' showIcon={true} alertType='success'>这是一条带有标题的info</Alert>
        <Alert title='标题' showIcon={true} alertType='warning'>这是一条带有标题的info</Alert> */}
        <Input size='lg' placeholder='请输入'/>
        <Input size='sm' icon='circle' onChange={(e)=>handleChange(e)} value={value}/>
        <Input icon='coffee'/>
        <Input disabled/>
    </div>
  );
}

export default App;
