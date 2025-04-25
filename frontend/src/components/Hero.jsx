import BgVideo from "../assets/bgVideo.mp4";
import { Box, Typography, Container, TextField, Button, InputAdornment } from '@mui/material';
import { keyframes } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from "react-router";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Hero = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        color: 'white',
        backgroundColor: '#000' // Fallback color
      }}
    >
      {/* Modern gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,  
          right: 0,
          bottom: 0,
          background: 'linear-gradient(160deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(4px)',
            zIndex: -1
          }
        }}
      />

      {/* Video Background with modern scaling */}
      <Box
        sx={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          right: '-5%',
          bottom: '-5%',
          zIndex: 0,
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        <video
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.7)'
          }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={BgVideo} type="video/mp4" />
        </video>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            animation: `${fadeIn} 1s ease-out`,
            transform: isSearchFocused ? 'translateY(-30px)' : 'translateY(0)',
            transition: 'transform 0.3s ease'
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(to right, #fff 20%, rgba(255,255,255,0.8) 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 20px 30px rgba(0,0,0,0.8)',
              letterSpacing: '-0.02em'
            }}
          >
            Welcome to Kasiglahan Library
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '700px',
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6
            }}
          >
            Discover a world of <strong>knowledge</strong>, <strong>inspiration</strong>, 
            and endless <strong>possibilities</strong> in our digital collection.
          </Typography>
        </Box>

        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            gap: 1,
            width: '100%',
            maxWidth: '650px',
            mx: 'auto',
            px: 2,
            animation: `${fadeIn} 1s ease-out 0.3s backwards`
          }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            id="search-field"
            label="Search for books..."
            type="search"
            input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            fullWidth
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                color: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: '#fff',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(253, 253, 253, 0.8)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(253, 253, 253, 0.8)'
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              color: '#000',
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Search
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
