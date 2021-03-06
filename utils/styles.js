import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
    navbar: {
        backgroundColor:'#203040',
        '& a': {
            color: '#ffffff',
            marginLeft :10,
        }

    },
    brand:{
        fontWeigt:'bold',
        fontSize:'1.5rem'
    },
    grow:{
        flexGrow:1
    },
    main: {
        minHeight:'80vh'
    },
    footer:{
        marginTop:10,
        textAlign:'center',
        
    },
    //slug
    section:{
        margin:"10px 0"
    }
})

export default useStyle