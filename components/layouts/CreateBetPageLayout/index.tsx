import { ReactChild, ReactChildren, useEffect, useState } from "react"

// Next
import Head from "next/head"
import Link from 'next/link'
import Image from "next/image"

// Utils
// import { IoMdClose } from "react-icons/io"
import getImageUrl from 'utils/getImageUrl'
import { boulder } from "styles/colors"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { ToastContainer } from "react-toastify";

// Components
import * as S from './StyledComponents'
import Navbar from '../shared/Navbar'

// Redux
import { useAppSelector } from "components/hooks/reduxHooks"
import UseNetwork from "components/shared/UseNetwork"
import { previousStep } from "components/createBetPage/ducks"
import { useDispatch } from "react-redux"

interface PropsI {
  children: ReactChild | ReactChildren;
}

const CreateBetPageLayout = ({ children }: PropsI) => {
  const { category, step } = useAppSelector((state) => state.createBetReducer)
  const [imageBackground, setImageBackground] = useState<string>('')
  const dispatch = useDispatch()

  let imageSrc = ''
  if (category) {
    switch (category) {
      case 'sports':
        imageSrc = '/mock/stadium.jpg'
        break;
      case 'esports':
        imageSrc = '/mock/eSports.jpg'
        break;
      case 'polititcal':
        imageSrc = '/mock/senate.jpg'
        break;
      case 'entertainment':
        imageSrc = '/mock/concert.jpg'
        break;
      case 'crypto projects':
        imageSrc = '/mock/bitcoin.jpg'
        break;
      case 'others':
        imageSrc = '/mock/stadium.jpg'
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (category) {
      setImageBackground(imageSrc)
    }
  }, [category])

  return (
    <S.Layout>
      <Head>
        <title>Create Bet</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Navbar />
      <S.Main data-name="create-bet-page">
        {/* <S.Button>
          <Link href="/">
            <S.IconLink>
              <IoMdClose size={30} color={boulder} />
            </S.IconLink>
          </Link>
        </S.Button> */}
        {step && step > 1 && (imageSrc || imageBackground) &&
          <S.BackgroundImage>
            <S.ImageContainer>
              <Image
                src={getImageUrl((imageSrc || imageBackground), true)}
                alt='background-image'
                layout="fill"
                objectFit="cover"
                loading='lazy'
              />
            </S.ImageContainer>
          </S.BackgroundImage>
        }
        <S.Content>
          {step && step > 1 &&
            <S.LeftButton onClick={() => dispatch(previousStep())}>
              <AiOutlineArrowLeft size={35} color={boulder} />
            </S.LeftButton>
          }
          {children}
        </S.Content>
      </S.Main>
      <UseNetwork />
      <ToastContainer
        autoClose={10000}
      />
    </S.Layout>
  );
};

export default CreateBetPageLayout;
