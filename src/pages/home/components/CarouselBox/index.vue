<template>
  <div className='common_width'>
      <div className='dm_CarouselBox'>
        1111111111
          <!-- {
              toJS( carouselList ).length ? (
                  <Carousel autoplay effect="fade">
                      {
                          toJS( carouselList ).map( item => {
                              return (
                                  <Link key={ item.id } 
                                      to={'/views/products/detail/' + item.id}
                                  >
                                      <img src={ `${ PUBLIC_URL }${ item.bannerPic }` } alt='' title={ item.description } />
                                  </Link>
                              );
                          } )
                      }
                  </Carousel>
              ) : ''
          } -->
      </div>
      <!-- <Recommend {...this.props} /> -->
  </div>  
</template>

<script>
  // 接口服务
  import service from './service';

  export default {
    data() {
      return ({
        carouselList: []
      })
    },
    mounted() {
      this.imgCarouselData();
    },
    methods: {
      async imgCarouselData() {
          const res = await service.imgCarouselData();
          try{
              if( res.data.code === 200 ){
                  // res.data.data && this.setCarouselList( res.data.data );
                  console.log('3333333', res.data.data);
              }
          }catch(err) {
              console.log(err);
          }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>