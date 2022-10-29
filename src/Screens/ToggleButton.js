const toggleButton = (type) => {
    const buttonHandler = () =>
     {
      setIsSelected(type);
      if(onClickEvent !== null)
      onClickEvent(isSelected);
     }
  
     return(
       <View>
         <Button rounded style={isSelected === type ? styles.activeButton : styles.button} onPress={() => buttonHandler()}>
              <Icon name={iconName} style={styles.icon} type={iconFamily}/>
        </Button>
      </View>
     )
}